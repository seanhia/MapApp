import { View, Image, Text, Animated } from "react-native";
import React, { useRef, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";
import { ImageHeader } from "@/components/ImageHeader";
import Splash from "@/assets/images/cloud.png";

export default function SplashScreenView(): JSX.Element {
  const { styles } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Fade in
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.fullContainer}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <ImageHeader image={Splash} text="EXPLORE" />
        <View style={{padding:75}}></View>
        <Text style={styles.boldText}>Track and Share Your Travels</Text>
      </Animated.View>
    </View>
  );
};
