import { useState, useEffect } from "react";
import Login from "@/app/screens/login/index";
import SplashScreenView from "./SplashScreen";
import { View } from "react-native";

export default function Index() {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplash(false);
    }, 1000);
  });

  return <>{isShowSplash ? <SplashScreenView /> : <Login />}</>;
}
