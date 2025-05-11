import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useRouter } from 'expo-router';
import { fetchCurrentUser } from '@/data/UserDataService';
import { User } from '@/data/types'
import { useTranslation } from 'react-i18next';

interface FooterBarProps {
  // Replace `any` with the type of your router if applicable
}

const FooterBar: React.FC<FooterBarProps> = () => {
  const { colorScheme, styles } = useTheme();
  const router = useRouter();
  const { t } = useTranslation();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [language, setSelectedLanguage] = useState<string>('en');

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const user = await fetchCurrentUser();
        setCurrentUser(user);

        const lang = user?.language || "en";
        setSelectedLanguage(lang);

      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    loadCurrentUser();
  }, []);



  return (

    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => router.push('/screens/leaderboard')}
      >
        <Text style={styles.buttonText}>{t('leader')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => router.push('/screens/friends')}
      >
        <Text style={styles.buttonText}>{t('friends')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => router.push('/screens/home')}
      >
        <Text style={styles.buttonText}>{t('home')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => router.push('/screens/user_profile')}
      >
        <Text style={styles.buttonText}>{t('profile')}</Text>
      </TouchableOpacity>
    </View>
  );
};


export default FooterBar;


