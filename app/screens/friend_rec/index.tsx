import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import ForceGraph from '@/app/screens/friend_rec/components/GraphVisualization';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, GestureHandlerRootView } from "react-native-gesture-handler";
import NodeColorLegend from '@/app/screens/friend_rec/components/Legend'; // or wherever you put it

import graph from '@/constants/boilerplate_graph.json'
import { GraphData } from '@/data/types';
import { useRoute } from '@react-navigation/native';
import { fetchExploreNetwork } from '@/data/Friendship';
import { Loading } from '@/components/Loading';
import { useTheme } from '@/hooks/useTheme';
import FooterBar from '@/components/FooterBar';

const FriendRecommendationScreen = () => {
  const { userId } = useLocalSearchParams(); // use user data to create a tree with user as root 
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const { styles } = useTheme();


  useEffect(() => {
    const fetchGraph = async () => {
      console.log('user from friend rec: ', userId);
      const response = await fetchExploreNetwork();
      setGraphData(response);
      console.log('Graph data fetched successfully:', response);
    };
    fetchGraph();
  }, [userId]);



  return graphData ? (
    <GestureHandlerRootView>
      <View style={styles.fullContainer}>
        <NodeColorLegend />
        <ForceGraph
          data={graphData}
          userId={userId} />

      </View>
    </GestureHandlerRootView>
  ) : (
    <Loading />
  );
};

export default FriendRecommendationScreen;

