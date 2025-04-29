import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import GraphVisualizer from '@/components/GraphVisualization';
import { useLocalSearchParams } from 'expo-router';

const FriendRecommendationScreen = () => {
  const { graph } = useLocalSearchParams();


  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <GraphVisualizer graph={graph} /> //graph is type string??
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
