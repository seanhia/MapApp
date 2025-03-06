import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, StyleSheet, Easing } from 'react-native';

const AnimatedCloudOverlay = () => {
  const fadeAnim = useRef(new Animated.Value(1)).current; // Start fully visible

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0, // Fades out to transparent
      duration: 3000, // 3 seconds
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Map Image (Background) */}
      <Image
        source={require('@/assets/images/cloud.png')} // Replace with your map image
        style={styles.map}
      />

      {/* Cloud Overlay (Fades Out) */}
      <Animated.View style={[styles.cloudContainer, { opacity: fadeAnim }]}>
        <Image
          source={require('@/assets/images/cloud.png')} // Replace with a semi-transparent cloud image
          style={styles.cloud}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
    position: 'absolute', // Background image
  },
  cloudContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cloud: {
    width: '120%', // Slightly larger for a smooth effect
    height: '120%',
    resizeMode: 'cover',
  },
});

export default AnimatedCloudOverlay;
