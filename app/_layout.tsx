import { Stack } from "expo-router";
import { useEffect, useState } from "react";
//import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import app from "../firebase";
import { ActivityIndicator, View } from "react-native";
import {getAuth, onAuthStateChanged, User} from 'firebase/auth'
import { ThemeProvider } from "@react-navigation/native";
import {Colors} from "@/constants/Colors"

export default function RootLayout() {

  // firebase basic setup
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState< User | null >();

  useEffect( () => {
    const auth = getAuth(app);
    const subscriber = onAuthStateChanged(auth, (user) => {
      console.log("onAuthStateChanged", user);
      setUser(user);
      if (initializing) setInitializing(false);
      });
      
    return subscriber; // to prevent memory leak
  }, []);

  if (initializing)
    return(
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <ActivityIndicator size="large" />
        </View>
    );

  return (
    // Used to later on implement themes on the App 
    // <ThemeProvider value={colorScheme === 'light' ? LightTheme} : DefaultTheme>
      <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.light.background,
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Stack.Screen name="index" options={{ title: 'Home',
          headerShown: false}}
        />
        <Stack.Screen name="screens/sign_up/index" options={{ title: ''}}/>
        <Stack.Screen name="screens/tutorial/index" options={{ title: ''}}/>
        <Stack.Screen name="screens/forgot_password/index" options={{ title: ''}}/>
        <Stack.Screen name="screens/home/index" options={{ title: ''}}/>
        <Stack.Screen name="screens/friends/index" options={{ title: ''}}/>
        <Stack.Screen name="screens/user_profile/index" options={{ title: ''}}/>
        <Stack.Screen name="screens/settings/index" options={{ title: ''}}/>
        <Stack.Screen name="screens/leaderboard/index" options={{ title: ''}}/>
      </Stack>
    // </ThemeProvider>
  );
}
