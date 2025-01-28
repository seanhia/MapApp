import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import { getAuth, updatePassword } from 'firebase/auth';
import { useTheme } from '@/hooks/useTheme'; 
import { ImageHeader } from '@/components/ImageHeader';
import {validatePassword} from "@/auth";


const UpdatePasswordScreen = () => {
  const { colorScheme, styles } = useTheme();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);


  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const auth = getAuth();
  const handlePasswordChange = async () => {
    setLoading(true);
    try {
      const user = await validatePassword(currentPassword);
      await updatePassword(user, newPassword)

        setModalMessage("Password Changed")
        setLoading(false);
    } catch (error) {
        console.error(error); 
        setModalMessage('An error occured. Please try again later.');
        setLoading(false);
    } finally {
        setModalVisible(true); //Show the modal with the appropriate message 
        setLoading(false);
    }
  };

  return (
    <View style={styles.halfContainer}>
      <ImageHeader
        image={require('@/assets/images/cloud.png')}
        text='EXPLORE'
      />      

      {/* Instructions */}
      <Text style={style.instructions}>
        Enter your current password, then enter your new password
      </Text>

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Current Password"
        placeholderTextColor="#BDBDBD"
        secureTextEntry
        autoCapitalize="none"
        onChangeText={setCurrentPassword}
        value={currentPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="New Password"
        placeholderTextColor="#BDBDBD"
        keyboardType="email-address"
        autoCapitalize="none"
        secureTextEntry
        onChangeText={setNewPassword}
        value={newPassword}
      />

      {/* Continue Button */}
      <TouchableOpacity style={styles.lightButton} onPress={handlePasswordChange}>
        <Text style={styles.boldText}>Continue</Text>
      </TouchableOpacity>

      {/* Modal for Feedback */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Handle modal close on back button
      >
        <View style={style.modalOverlay}>
          <View style={style.modalContent}>
            <Text style={style.modalTitle}>Notification</Text>
            <Text style={style.modalMessage}>{modalMessage}</Text>
            <Pressable
              style={styles.lightButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.boldText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const style = StyleSheet.create({
  instructions: {
    fontSize: 14,
    color: '#6B6B6B',
    textAlign: 'center',
    marginBottom: 30,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 14,
    color: '#6B6B6B',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default UpdatePasswordScreen;