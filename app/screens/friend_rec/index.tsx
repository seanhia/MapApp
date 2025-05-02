import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import GraphVisualizer from '@/components/GraphVisualization';
import { useLocalSearchParams } from 'expo-router';
import graph from '@/constants/boilerplate_graph.json'
import { GraphData } from '@/data/types';
import { useRoute } from '@react-navigation/native';
import { fetchExploreNetwork } from '@/data/Friendship';
import { Loading } from '@/components/Loading';

const FriendRecommendationScreen = () => {
  const { graph } = useLocalSearchParams();
  const [graphData, setGraphData] = useState<GraphData | null>(null);


  // let parsedGraph: GraphData | null = null;

  useEffect(() => {
    const fetchGraph = async () => {
      const response = await fetchExploreNetwork();
      setGraphData(response);
      console.log('Graph data fetched successfully:', response);
    };
    fetchGraph();
  }, []);


  // try {
  //   parsedGraph = graph ? JSON.parse(graph as string) : null;
  // } catch (e) {
  //   console.error('Failed to parse graph data', e);
  // }

  // console.log(`friend rec screen graph: ${graph}, ${typeof graph}`)
  // console.log('passed_graph: ', parsedGraph, ' - ', typeof parsedGraph);


  return graphData ? (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <GraphVisualizer data={graphData} />
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
