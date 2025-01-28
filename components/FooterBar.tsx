import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useRouter } from 'expo-router';

interface FooterBarProps {
  // Replace `any` with the type of your router if applicable
}

const FooterBar: React.FC<FooterBarProps> = ( ) => {
  const { colorScheme, styles } = useTheme();
  const router = useRouter();
  
  return (
    
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => router.push('/screens/leaderboard')}
      >
        <Text style={styles.text}>Leaderboard</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => router.push('/screens/friends')}
      >
        <Text style={styles.text}>Friends</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => router.push('/screens/user_profile')}
      >
        <Text style={styles.text}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};


export default FooterBar;
