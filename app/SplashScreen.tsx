import { View, Text, Image, StyleSheet, Animated } from "react-native";
import React, { useEffect } from "react";
import { useColorScheme } from "react-native";

import sharedStyles from "@/constants/sharedStyles";
import Splash from "@/assets/images/cloud.png";

export default function SplashScreenView() {
  const colorScheme = useColorScheme();
  const styles = sharedStyles(colorScheme);
  return (
    <View>
      <View>
        <Image style={styles.imagePost} source={Splash} />
      </View>
    </View>
  );
}
