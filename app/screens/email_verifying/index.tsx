import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import sharedStyles from '@/constants/sharedStyles'; // Import the shared styles 
import { ImageHeader } from '@/components/ImageHeader';
import {waitForEmailVerification} from "@/auth";
import {router} from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from 'react-i18next';
import i18n from '@/components/translations/i18n';


const emailVerifyScreen = () => {
  const { colorScheme, styles } = useTheme();
  const { t } = useTranslation();
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
    <View style={styles.fullContainer}>
      <ImageHeader
        image={require('@/assets/images/cloud.png')}
        text='EXPLORE'
      />      

      {/* Instructions */}
      <Text style={style.instructions}>
        {t('email_instructions')}
      </Text>
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

export default emailVerifyScreen;