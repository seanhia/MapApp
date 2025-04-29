import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import GraphVisualizer from '@/components/GraphVisualization';
import { useLocalSearchParams } from 'expo-router';
import graph from '@/constants/boilerplate_graph.json'

const FriendRecommendationScreen = () => {
  // const graph = useLocalSearchParams();
  console.log(`friend rec screen graph: ${graph}`)


  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <GraphVisualizer data={graph} />
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
