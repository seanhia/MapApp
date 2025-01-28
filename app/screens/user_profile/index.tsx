import React from 'react';
import { View, ScrollView } from 'react-native';
import ProfileHeader from './components/ProfileHeader'
import ProfileDetails from './components/ProfileDetails'
import ProfilePost from './components/ProfilePost';
import { useRouter } from 'expo-router';
import ProfileStatistics from './components/ProfileStatistics';
import { useTheme } from '@/hooks/useTheme';
import FooterBar from '@/components/FooterBar';

const userProfile = () => {
  const { colorScheme, styles } = useTheme();
  const router = useRouter();
  
  return (
      <View style={styles.fullContainer}>
        <ScrollView>

          <ProfileHeader />

          <ProfileDetails />

          <ProfilePost />

          <ProfileStatistics />

        </ScrollView>

        <View >
          <FooterBar />
        </View>
      </View>
  );
};

export default userProfile;
