import { Stack, useRouter, useSegments, Slot, useNavigationContainerRef, Tabs } from "expo-router";
import { useEffect, useState } from "react";
//import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import app from "../firebase";
import { ActivityIndicator, View } from "react-native";
import {getAuth, onAuthStateChanged, User} from 'firebase/auth'
import {Colors} from "@/constants/Colors"
import { useTheme } from "@/hooks/useTheme";
import sharedStyles from "@/constants/sharedStyles";
import { ThemeProvider } from "@react-navigation/native";
import FooterBar from "@/components/FooterBar";


export default function RootLayout() {

  const { colorScheme, styles } = useTheme();
  const theme = colorScheme?.toString()

  // firebase basic setup
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState< User | null >();

  const router = useRouter(); 
  const segments = useSegments();
  const navigationRef = useNavigationContainerRef(); // Helps check if navigation is ready

  const publicRoutes = ["sign_up", "tutorial", "forgot_password", "index"]

  useEffect( () => {
    const auth = getAuth(app);
    const subscriber = onAuthStateChanged(auth, (user) => {
      console.log("onAuthStateChanged", user);
      setUser(user);
      if (initializing) setInitializing(false);
      });
      
    return subscriber; // to prevent memory leak
  }, []);

  useEffect(() => {
  if (initializing || !navigationRef.isReady()) return;

    // console.log("Segments:", segments); // Debugging line

    const currentPage = segments.length > 1 ? segments[1] : segments[0]; // nested routes 

    // console.log("Current Page:", currentPage);
    if (currentPage) {
      const isAuthPage = publicRoutes.includes(currentPage);
      
      // console.log("Is Auth Page:", isAuthPage);

      if (!user && !isAuthPage) {
        console.log("Redirecting to login...");
        router.replace("/"); 
      }
  }
  }, [user, segments, initializing]);

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
    // <Stack/>
    // // <ThemeProvider >
      <Stack // Transition between screens where each new screen is placed on top of a stack
        screenOptions={{
          headerStyle: { backgroundColor: Colors.light.background  },
          headerTintColor: '#000',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        
        <Stack.Screen name="index" options={{ title: 'Login',
          headerShown: false}}
        />
        <Stack.Screen name="screens/sign_up/index" options={{ title: ''}}/>
        <Stack.Screen name="screens/tutorial/index" options={{ title: ''}}/>
        <Stack.Screen name="screens/forgot_password/index" options={{ title: ''}}/>

          <Stack.Screen name="screens/home/index" options={{ title: '', headerShown: false }}/>
          <Stack.Screen name="screens/friends/index" options={{ title: ''}}/>
          <Stack.Screen name="screens/user_profile/index" options={{ title: ''}}/>
          <Stack.Screen name="screens/settings/index" options={{ title: ''}}/>
          <Stack.Screen name="screens/leaderboard/index" options={{ title: ''}}/>
          <Stack.Screen name="screens/email_verifying/index" options={{ title: '', headerShown: false}}/>
          <Stack.Screen name="screens/change_password/index" options={{ title: ''}}/>
      </Stack>
    //   // </ThemeProvider>
  );
}
