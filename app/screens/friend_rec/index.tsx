import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import GraphVisualizer from '@/components/GraphVisualization';
import {GraphData} from '@/data/types'
import { useLocalSearchParams } from 'expo-router';

interface FriendRecommendationScreenProps {
  graph: GraphData | null;
}

const FriendRecommendationScreen: React.FC<FriendRecommendationScreenProps> = ({ }) => {
  const [graphData, setGraphData] = useState<String | null>(null);
  const { graph } = useLocalSearchParams();

  useEffect(() => {
    if (graph) {
      setGraphData(graph);
      console.log(`graph: ${graphData}`)
    }
  }, [graph]);

  return (
    <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <GraphVisualizer graph={graphData} />
        </View>
    </View>
  );
};

export default FriendRecommendationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
});
