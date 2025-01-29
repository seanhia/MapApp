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
import {waitForEmailVerification} from "@/auth";
import {router} from 'expo-router';


const emailVerifyScreen = () => {
  
  const  checkingEmail = async () => {
  try {
    await waitForEmailVerification();
    router.replace('/screens/home');
  } catch(e) {
    alert(e)
  }
}
  checkingEmail();

  return (
    <View style={sharedStyles('dark').halfContainer}>
      <ImageHeader
        image={require('@/assets/images/cloud.png')}
        text='EXPLORE'
      />      

      {/* Instructions */}
      <Text style={styles.instructions}>
        Please go to your eMail inbox and verify your email
      </Text>
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

export default emailVerifyScreen;