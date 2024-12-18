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
import { getAuth, fetchSignInMethodsForEmail, sendPasswordResetEmail } from 'firebase/auth';
import sharedStyles from '../../../constants/sharedStyles'; // Import the shared styles 


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const auth = getAuth();

  const handleContinue = async () => {
    // Simulate email sending (add actual email sending logic here)
    if (!email) {
        setModalMessage('Please enter a valid email address.');
        setModalVisible(true);
        return; 
    }
    
    try {
        const signInMethods = await fetchSignInMethodsForEmail(auth, email);

        if (signInMethods.length == 0) {
            // No user found for this email
            setModalMessage('This email is not registered. Please check and try again.');
        } else {
            // Email exists in Firebase, send reset email
            await sendPasswordResetEmail(auth, email);
            setModalMessage('A password reset link has been sent to ${email}.');
        }
    } catch (error) {
        console.error(error); 
        setModalMessage('An error occured. Please try again later.');
    } finally {
        setModalVisible(true); //Show the modal with the appropriate message 
    }
  };

  return (
    <View style={styles.container}>
      {/* Cloud Image */}
      <Image
        style={styles.cloudImage}
        source={require('../../../assets/images/cloud.png')} 
      />

      {/* Title */}
      <Text style={styles.title}>EXPLORE</Text>

      {/* Instructions */}
      <Text style={styles.instructions}>
        Enter the email associated with your account and we'll send you a link to reset your password.
      </Text>

      {/* Email Input */}
      <TextInput
        style={sharedStyles.input}
        placeholder="Email"
        placeholderTextColor="#BDBDBD"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />

      {/* Continue Button */}
      <TouchableOpacity style={sharedStyles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
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
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  cloudImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 14,
    color: '#6B6B6B',
    textAlign: 'center',
    marginBottom: 30,
  },
//   input: {
//     width: '100%',
//     height: 50,
//     backgroundColor: '#FFF5E1',
//     borderRadius: 25,
//     paddingHorizontal: 20,
//     fontSize: 16,
//     color: '#000000',
//     marginBottom: 20,
//   },
  // button: {
  //   width: '100%',
  //   height: 50,
  //   backgroundColor: '#FFE5B4',
  //   borderRadius: 25,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
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
  modalButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#FFE5B4',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default ForgotPassword;