import { Stack } from "expo-router";
import { useEffect, useState } from "react";
//import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import app from "../firebase";
import { ActivityIndicator, View } from "react-native";
import {getAuth, onAuthStateChanged, User} from 'firebase/auth'

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
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="sign_up" />
    </Stack>
  );
}
