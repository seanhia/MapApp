import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Pressable,
} from 'react-native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useTheme } from '@/hooks/useTheme';
import { ImageHeader } from '@/components/ImageHeader';
import { Colors } from '@/constants/Colors';
import { useTranslation } from 'react-i18next';



const ForgotPassword = () => {
  const { colorScheme, styles } = useTheme();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const auth = getAuth();

  const handleContinue = async () => {
    // Simulate email sending (add actual email sending logic here)
    if (!email) {
        setModalMessage(t('valid_email'));
        setModalVisible(true);
        return; 
    }
    
    try {
        // const signInMethods = await fetchSignInMethodsForEmail(auth, email);

        // if (signInMethods.length == 0) {
        //     // No user found for this email
        //     setModalMessage('This email is not registered. Please check and try again.');
        // } else {
        //     // Email exists in Firebase, send reset email
        //     await sendPasswordResetEmail(auth, email);
        //     setModalMessage('A password reset link has been sent to ${email}.');
        // }
        await sendPasswordResetEmail(auth, email);
        setModalMessage(t('password_reset'))
    } catch (error) {
        console.error(error); 
        setModalMessage(t('error'));
    } finally {
        setModalVisible(true); //Show the modal with the appropriate message 
    }
  };

  return (
    <View style={{backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background, flex: 1}}>
      <View style={styles.halfContainer}>
        <ImageHeader
          image={require('@/assets/images/cloud.png')}
          text='EXPLORE'
        />      

        {/* Instructions */}
        <Text style={style.instructions}>
          {t('email_associated')}
        </Text>

        {/* Email Input */}
        <TextInput
          style={styles.placeHolderInput}
          placeholder={t('email')}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
          value={email}
        />

        {/* Continue Button */}
        <TouchableOpacity style={styles.lightButton} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
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

export default ForgotPassword;