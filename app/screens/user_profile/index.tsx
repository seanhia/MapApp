import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import ProfileHeader from './components/ProfileHeader'
import ProfileDetails from './components/ProfileDetails'
import UserPhotos from './components/Photos/UserPhotos';
import { useRouter } from 'expo-router';
import ProfileStatistics from './components/ProfileStatistics';
import { useTheme } from '@/hooks/useTheme';
import FooterBar from '@/components/FooterBar';
import { User } from '@/data/types'
import { fetchCurrentUser } from '@/data/UserDataService';
import graph_json from "@/constants/boilerplate_graph.json" 
import GraphVisualizer from '@/components/GraphVisualization';


const userProfile = () => {
  const { colorScheme, styles } = useTheme();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const user = await fetchCurrentUser();
        setCurrentUser(user)
        console.log(user)
      } catch (error) {
        // console.error('Error fetching user')
      }
    }

    loadCurrentUser();
  }, []);

  return (
    <View style={styles.fullContainer}>
      <ScrollView >

        <ProfileHeader
          user={currentUser} />

        <ProfileDetails
          user={currentUser} />

        <UserPhotos
          user={currentUser} />

        <GraphVisualizer graph={graph_json}/>

        <ProfileStatistics />

      </ScrollView>

      <View >
        <FooterBar />
      </View>
    </View>
  );
};

export default userProfile;
