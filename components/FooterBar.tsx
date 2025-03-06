import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useRouter } from 'expo-router';
import NotificationsScreen from '@/app/screens/notifications';

interface FooterBarProps {
  // Replace `any` with the type of your router if applicable
}

const FooterBar: React.FC<FooterBarProps> = ( ) => {
  const { colorScheme, styles } = useTheme();
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => router.push('/screens/leaderboard')}
      >
        <Text style={styles.buttonText}>Leaderboard</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => router.push('/screens/friends')}
      >
        <Text style={styles.buttonText}>Friends</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => router.push('/screens/home')}
      >
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => router.push('/screens/user_profile')}
      >
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => setSidebarOpen(true)}>
        <Text style={styles.buttonText}>Notifications</Text>
      </TouchableOpacity>

      {isSidebarOpen && (
        <View style={[styles.sidebar, {position:'absolute'}]}>
          <NotificationsScreen onClose={() => setSidebarOpen(false)} />
        </View>
      )}
    </View>
  );
};


export default FooterBar;


 