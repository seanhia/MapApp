import { View, Image, Text, ActivityIndicator, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { useTheme } from "@/hooks/useTheme";
import { Colors } from "@/constants/Colors";
import { ImageHeader } from "@/components/ImageHeader";

// import sharedStyles from "@/constants/sharedStyles";
import Splash from "@/assets/images/cloud.png";

export default function SplashScreenView() {
  const { styles } = useTheme(); 
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, [fadeAnim]);
  
    return (
      <View style={styles.fullContainer}>
        <View>
        <Animated.View style={{ opacity: fadeAnim }}>
          <ImageHeader 
            image={Splash}
            text='EXPLORE'
          />
          {/* <Image 
            style={styles.imagePost} source={Splash} 
          /> */}
          <Text style={styles.boldText}>Track & Share Your Travels</Text>
        </Animated.View>
        <ActivityIndicator 
          style={{flex: 1, alignItems: 'center', justifyContent: 'space-between', padding: 80}}
          animating={true}
          size="large" 
          color={Colors.light.button}/>
        </View>
      </View>
    );
}

