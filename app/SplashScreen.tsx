import { View, Text, Image, StyleSheet, Animated } from "react-native";
import React, { useEffect } from "react";

import sharedStyles from "@/constants/sharedStyles";
import Splash from "@/assets/images/cloud.png";

export default function SplashScreenView() {
  const styles = sharedStyles();
  return (
    <View>
      <View>
        <Image style={styles.imagePost} source={Splash} />
      </View>
    </View>
  );
}
