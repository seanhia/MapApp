import {
  Stack,
  useRouter,
  useSegments,
  Slot,
  useNavigationContainerRef,
  Tabs,
} from "expo-router";
import { useEffect, useState } from "react";
//import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import app from "../firebase";
import { ActivityIndicator, View } from "react-native";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { ThemeProvider } from "@react-navigation/native";
import { I18nextProvider } from 'react-i18next';
import i18n from '@/components/translations/i18n';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  const { colorScheme, styles } = useTheme();
  const theme = colorScheme?.toString();

  // firebase basic setup
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>();

  const router = useRouter();
  const segments = useSegments();
  const navigationRef = useNavigationContainerRef(); // Helps check if navigation is ready

  const publicRoutes = [
    "sign_up",
    "tutorial",
    "forgot_password",
    "index",
    "email_verifying",
    "splash_screen"
  ];

  useEffect(() => {
    const auth = getAuth(app);
    const subscriber = onAuthStateChanged(auth, (user) => {
      console.log("onAuthStateChanged", user);
      setUser(user);
      if (initializing) setInitializing(false);
    });

    return subscriber; // to prevent memory leak
  }, []);

  // Block users who aren't signed in from reaching certain pages
  useEffect(() => {
    if (initializing || !navigationRef.isReady()) return;

    const currentPage = segments.length > 1 ? segments[1] : segments[0]; // nested routes
    // console.log(segments)

    if (currentPage) {
      const isAuthPage = publicRoutes.includes(currentPage);

      if (!user ? !isAuthPage : null) {
        console.log("Redirecting to login...");
        router.replace("/");
      }
    }
  }, [user, segments, initializing]);

  if (initializing)
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    // // <ThemeProvider >
    <GestureHandlerRootView style={{ flex: 1 }}>
      <I18nextProvider i18n={i18n}> {/**implements translation to teh whole app */}
        <Stack // Transition between screens where each new screen is placed on top of a stack
          screenOptions={{
            headerStyle: { backgroundColor: theme == 'dark' ? Colors.dark.background : Colors.light.background },
            headerTintColor: theme == 'dark' ? Colors.dark.text : Colors.light.text,
            headerTitleStyle: { fontWeight: "bold" },
          }}
        >
          <Stack.Screen
            name="index"
            options={{ title: "", headerShown: false }}
          />
          <Stack.Screen
            name="screens/login/index"
            options={{ title: "Login", headerShown: false }}
          />
          <Stack.Screen
            name="screens/sign_up/index"
            options={{ title: "", headerShown: false }}
          />
          <Stack.Screen
            name="screens/tutorial"
            options={{ title: "", headerShown: false }}
          />
          <Stack.Screen
            name="screens/forgot_password/index"
            options={{ title: "", headerShown: false }}
          />

          <Stack.Screen
            name="screens/home/index"
            options={{ title: "", headerShown: false }}
          />
          <Stack.Screen
            name="screens/friends/index"
            options={{ title: "", headerShown: false }}
          />
          <Stack.Screen
            name="screens/friend_rec/index"
            options={{ title: "", headerShown: true }}
          />
          <Stack.Screen
            name="screens/profile_view/index"
            options={{ title: "", headerShown: true }}
          />
          <Stack.Screen
            name="screens/user_profile/index"
            options={{ title: "", headerShown: false }}
          />
          <Stack.Screen
            name="screens/passport/index"
            options={{ title: "", headerShown: true }}
          />
          <Stack.Screen
            name="screens/settings/index"
            options={{ title: "" }}
          />
          <Stack.Screen
            name="screens/leaderboard/index"
            options={{ title: "", headerShown: false }}
          />
          <Stack.Screen
            name="screens/email_verifying/index"
            options={{ title: "", headerShown: false }}
          />
          <Stack.Screen
            name="screens/change_password/index"
            options={{ title: "" }}
          />
        </Stack>
      </I18nextProvider>
    </GestureHandlerRootView>
    //   // </ThemeProvider>
  );
}
