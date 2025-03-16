import ProfileDetails from "../user_profile/components/ProfileDetails";
import { View, ScrollView, Text } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import React, { useState, useEffect } from "react";
import { User, Post } from "@/data/types";
import { fetchUserByUID } from "@/data/UserDataService";
import { useLocalSearchParams } from "expo-router";
import FooterBar from "@/components/FooterBar";
// import { fetchPostbyAuthor } from "@/data/PostDataService";
import FriendProfile from '@/app/screens/profile_view/components/FriendProfile'
import {MapButton} from '@/app/screens/profile_view/components/MapButton'

/**
 * Profile View Screen
 * --------------------
 * This component displays another user's profile, allowing users to view
 * details about their friends or other users in the app OR displays that the users profile is private
 */

const ProfileView = () => {
  const { colorScheme, styles } = useTheme();
  const { userId } = useLocalSearchParams(); // Retrieve userId from params //friendship id
  const [user, setUser] = useState<User | null>(null);
 
  useEffect(() => {
    const loadUser = async () => {
      if (!userId) return; // Ensure userId exists
      try {
        const userData = await fetchUserByUID(userId as string);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    loadUser();
  }, [userId]); // Dependency to re-fetch if the userId changes


  
   
  return (
    <View style={styles.fullContainer}>
      <ProfileDetails user={user} /> 
      <MapButton user={user} />
      <FriendProfile user={user} />
      
      <FooterBar />
    </View>
  );
};

export default ProfileView;
