// FooterBar.tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import sharedStyles from '@/constants/sharedStyles';
import { useRouter } from 'expo-router';

interface FooterBarProps {
  // Replace `any` with the type of your router if applicable
}

const FooterBar: React.FC<FooterBarProps> = ( ) => {
  const router = useRouter();
  
  return (
    
    <View style={sharedStyles.footer}>
      <TouchableOpacity
        style={sharedStyles.footerButton}
        onPress={() => router.push('/screens/leaderboard')}
      >
        <Text style={sharedStyles.text}>Leaderboard</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={sharedStyles.footerButton}
        onPress={() => router.push('/screens/friends')}
      >
        <Text style={sharedStyles.text}>Friends</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={sharedStyles.footerButton}
        onPress={() => router.push('/screens/user_profile')}
      >
        <Text style={sharedStyles.text}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};


export default FooterBar;
