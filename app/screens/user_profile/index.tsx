import React from 'react';
import { View, ScrollView } from 'react-native';
import ProfileHeader from './components/ProfileHeader'
import ProfileDetails from './components/ProfileDetails'
import ProfilePost from './components/ProfilePost';
import { useRouter } from 'expo-router';
import ProfileStatistics from './components/ProfileStatistics';
import sharedStyles from '@/constants/sharedStyles';
import FooterBar from '@/components/FooterBar';

const userProfile = () => {
  const router = useRouter();
  return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView>

          <ProfileHeader />

          <ProfileDetails />

          <ProfilePost />

          <ProfileStatistics />

        </ScrollView>

        <View style={sharedStyles.footer}>
          <FooterBar />
        </View>
      </View>
  );
};

export default userProfile;
