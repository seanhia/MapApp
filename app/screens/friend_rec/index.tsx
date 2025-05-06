import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import ForceGraph from '@/components/GraphVisualization';
import { useLocalSearchParams } from 'expo-router';
import graph from '@/constants/boilerplate_graph.json'
import { GraphData } from '@/data/types';
import { useRoute } from '@react-navigation/native';
import { fetchExploreNetwork } from '@/data/Friendship';
import { Loading } from '@/components/Loading';

const FriendRecommendationScreen = () => {
  const { user } = useLocalSearchParams(); // use user data to create a tree with user as root 
  const [graphData, setGraphData] = useState<GraphData | null>(null);


  useEffect(() => {
    const fetchGraph = async () => {
      const response = await fetchExploreNetwork();
      setGraphData(response);
      console.log('Graph data fetched successfully:', response);
    };
    fetchGraph();
  }, [user]);



  return graphData ? (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <ForceGraph data={graphData} />
      </View>
    </View>
  ) : (
    <Loading />
  );
};

export default FriendRecommendationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
});
