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
import sharedStyles from '@/constants/sharedStyles'; // Import the shared styles 
import { ImageHeader } from '@/components/ImageHeader';
import {validatePassword} from "@/auth";



const UpdatePasswordScreen = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);


  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const auth = getAuth();
  const handlePasswordChange = async () => {
    setLoading(true);
    if (newPassword !== confirmPassword) {
      setModalMessage('New password does not match confirmed password');
      setModalVisible(true); //Show the modal with the appropriate message 
      setLoading(false);
      return
    }
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
    <View style={sharedStyles('dark').halfContainer}>
      <ImageHeader
        image={require('@/assets/images/cloud.png')}
        text='EXPLORE'
      />      

      {/* Instructions */}
      <Text style={styles.instructions}>
        Enter your current password, then enter your new password
      </Text>

      {/* Password Input */}
      <TextInput
        style={sharedStyles('dark').input}
        placeholder="Current Password"
        placeholderTextColor="#BDBDBD"
        secureTextEntry
        autoCapitalize="none"
        onChangeText={setCurrentPassword}
        value={currentPassword}
      />

      <TextInput
        style={sharedStyles('dark').input}
        placeholder="New Password"
        placeholderTextColor="#BDBDBD"
        autoCapitalize="none"
        secureTextEntry
        onChangeText={setNewPassword}
        value={newPassword}
      />

      <TextInput
        style={sharedStyles('dark').input}
        placeholder="Confirm Password"
        placeholderTextColor="#BDBDBD"
        autoCapitalize="none"
        secureTextEntry
        onChangeText={setConfirmPassword}
        value={confirmPassword}
      />

      {/* Continue Button */}
      <TouchableOpacity style={sharedStyles('dark').lightButton} onPress={handlePasswordChange}>
        <Text style={sharedStyles('dark').boldText}>Continue</Text>
      </TouchableOpacity>

      {/* Modal for Feedback */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Handle modal close on back button
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Notification</Text>
            <Text style={styles.modalMessage}>{modalMessage}</Text>
            <Pressable
              style={sharedStyles('dark').lightButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={sharedStyles('dark').boldText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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