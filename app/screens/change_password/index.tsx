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
import { useTheme } from '@/hooks/useTheme'; 
import { Colors } from '@/constants/Colors'
import { ImageHeader } from '@/components/ImageHeader';
import {validatePassword} from "@/auth";
import { User } from '@/data/types'
import { fetchCurrentUser } from '@/data/UserDataService';
import { useTranslation } from 'react-i18next';
import i18n from '@/components/translations/i18n';



const UpdatePasswordScreen = () => {
  const { colorScheme, styles } = useTheme();
  const { t } = useTranslation();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);


  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [language, setSelectedLanguage] = useState<string>('en');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const loadCurrentUser = async () => {
        try {
            const user = await fetchCurrentUser();
            setCurrentUser(user);
            
            const lang = user?.language || "en";
            setSelectedLanguage(lang);
            i18n.changeLanguage(lang);

        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };
    loadCurrentUser();
}, []);
  const handlePasswordChange = async () => {
    setLoading(true);
    if (newPassword !== confirmPassword) {
      setModalMessage(t('new_password_not_match'));
      setModalVisible(true); //Show the modal with the appropriate message 
      setLoading(false);
      return
    }
    try {
      const user = await validatePassword(currentPassword);
      await updatePassword(user, newPassword)
        setModalMessage(t('password_changed'))
        setLoading(false);
    } catch (error) {
        console.error(error); 
        setModalMessage(t('error'));
        setLoading(false);
    } finally {
        setModalVisible(true); //Show the modal with the appropriate message 
        setLoading(false);
    }
  };

  return (
    <View style = {{backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background, flex: 1}}>
      <View style={styles.halfContainer}>
        <ImageHeader
          image={require('@/assets/images/cloud.png')}
          text='EXPLORE'
        />      

        {/* Instructions */}
        <Text style={style.instructions}>
        {t('enter_current_password')}
        </Text>

        {/* Password Input */}
        <TextInput
          style={styles.placeHolderInput}
          placeholder={t('current_password')}
          secureTextEntry
          autoCapitalize="none"
          onChangeText={setCurrentPassword}
          value={currentPassword}
        />

        <TextInput
          style={styles.placeHolderInput}
          placeholder={t('new_password')}
          autoCapitalize="none"
          secureTextEntry
          onChangeText={setNewPassword}
          value={newPassword}
        />

      <TextInput
        style={styles.placeHolderInput}
        placeholder={t('confirm_password')}
        autoCapitalize="none"
        secureTextEntry
        onChangeText={setConfirmPassword}
        value={confirmPassword}
      />

        {/* Continue Button */}
        <TouchableOpacity style={styles.lightButton} onPress={handlePasswordChange}>
          <Text style={styles.buttonText}>{t('continue')}</Text>
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
              <Text style={style.modalTitle}>{t('notification')}</Text>
              <Text style={style.modalMessage}>{modalMessage}</Text>
              <Pressable
                style={styles.lightButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.boldText}>{t('ok')}</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
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