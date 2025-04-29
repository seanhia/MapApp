import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import ProfileHeader from './components/ProfileHeader'
import ProfileDetails from './components/ProfileDetails'
import UserPhotos from './components/Photos/UserPhotos';
import { useRouter } from 'expo-router';
import ProfileStatistics from './components/ProfileStatistics';
import { useTheme } from '@/hooks/useTheme';
import FooterBar from '@/components/FooterBar';
import { User, GraphData } from '@/data/types'
import { fetchCurrentUser } from '@/data/UserDataService';
import graph_json from "@/constants/boilerplate_graph.json"
import ForceGraph from '@/components/GraphVisualization';


const userProfile = () => {
  const { colorScheme, styles } = useTheme();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [graphData, setGraphData] = useState<GraphData | null>(graph_json);

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


  useEffect(() => {
    if (graph_json && typeof graph_json === 'string') {
      try {
        const parsed: GraphData = JSON.parse(graph_json); // Add `as GraphData` here
        setGraphData(parsed);
      } catch (err) {
        console.error('Invalid graph data', err);
      }
    }
  }, [graph_json]);

  return (
    <View style={styles.fullContainer}>
      <ScrollView >

        <ProfileHeader
          user={currentUser} />

        <ProfileDetails
          user={currentUser} />

        <UserPhotos
          user={currentUser} />

        <ForceGraph data={graph_json} />

        <ProfileStatistics />

      </ScrollView>

      <View >
        <FooterBar />
      </View>
    </View>
  );
};

export default userProfile;
