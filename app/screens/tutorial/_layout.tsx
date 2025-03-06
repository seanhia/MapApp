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
                headerStyle: {backgroundColor: Colors.light.background}
            }}
        >
            <Stack.Screen
                name="tutorial_welcome"
                options={{ title: "", headerShown: true, }}
            />
            <Stack.Screen
                name="tutorial_2"
                options={{}}
            />
             <Stack.Screen
                name="tutorial_3"
                options={{}}
            />
             <Stack.Screen
                name="tutorial_final"
                options={{}}
            />
        </Stack>
    )   
}