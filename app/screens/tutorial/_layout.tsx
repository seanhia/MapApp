import {
    Stack, 
    useRouter, 
    useSegments, 
    useNavigationContainerRef,
    Tabs,
} from "expo-router"

import { useEffect, useState } from "react";
//import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import app from "@/firebase";
import { ActivityIndicator, View } from "react-native";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";

export default function TutorialLayout() {
    const { colorScheme } = useTheme()
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background
                },


            }}>

            <Stack.Screen
                name="index"
                options={{ title: "Welcome", headerShown: false }}
            />
            <Stack.Screen
                name="tutorial_2"
                options={{title: "Page 2", headerShown: false}}
            />
             <Stack.Screen
                name="tutorial_3"
                options={{title: "Page 3", headerShown: false}}
            />
             <Stack.Screen
                name="tutorial_final"
                options={{title: "Complete", headerShown: false}}
            />
        </Stack>
    )   
}