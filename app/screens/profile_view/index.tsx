import ProfileDetails from "../user_profile/components/ProfileDetails";
import { View, ActivityIndicator, Text } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import React, { useState, useEffect } from 'react';
import { User, Friend } from '@/data/types';
import { fetchUserByUID } from "@/data/UserDataService";
import { useLocalSearchParams } from 'expo-router';


const ProfileView = () => {
    const { colorScheme, styles } = useTheme();
    const { userId } = useLocalSearchParams(); // Retrieve userId from params
    const [user, setUser] = useState<User | null>(null); 

    
    useEffect(() => {
        const loadUser = async () => {
            if (!userId) return; // Ensure userId exists
            try {
                const userData = await fetchUserByUID(userId as string);
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        loadUser();
    }, [userId]); // Dependency to re-fetch if the userId changes

    return (
        <View style={styles.fullContainer}>
            {user ? <ProfileDetails user={user} /> : <Text>User not found</Text>}
        </View>
    );
};

export default ProfileView;
