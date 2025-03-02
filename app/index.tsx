import { useState, useEffect, useRef } from "react";
import Login from "@/app/screens/login/index";
import SplashScreenView from "@/app/SplashScreen";
import { View, Animated } from "react-native";

export default function Index() {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current; // Start at full opacity

  useEffect(() => {
    // Fade out the splash screen
    Animated.timing(fadeAnim, {
      toValue: 0, // Fade out
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      setIsShowSplash(false); // After animation, hide splash screen
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isShowSplash ? (
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
          <SplashScreenView />
        </Animated.View>
      ) : (
        <Login />
      )}
    </View>
  );
}