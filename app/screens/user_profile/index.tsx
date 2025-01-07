import React from 'react';
import { View, ScrollView } from 'react-native';
import ProfileHeader from './components/ProfileHeader'
import ProfileDetails from './components/ProfileDetails'
import ProfilePost from './components/ProfilePost';
import { useRouter } from 'expo-router';
import ProfileStatistics from './components/ProfileStatistics';
import sharedStyles from '@/constants/sharedStyles';
import FooterBar from '@/components/FooterBar';
import { User } from '@/data/types'
import { fetchCurrentUser } from '@/data/UserDataService';

const userProfile = () => {
  const router = useRouter();
  
  return (
      <View style={sharedStyles.fullContainer}>
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
