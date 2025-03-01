import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Platform, PermissionsAndroid } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';  //install this

import { fetchFriendCount } from '@/data/FriendshipQuery';
import { User } from '@/data/types'
import { useTheme } from '@/hooks/useTheme';
import { useProfileImage } from '@/hooks/useProfileImage';
import { fetchCurrentUser } from '@/data/UserDataService';
import { storage } from '@/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, setDoc, updateDoc, collection, getDocs, query, where, deleteDoc } from 'firebase/firestore';
import db from '@/firestore';


interface ProfileDetailsProps {
    user: User | null;
};
const ProfileDetails: React.FC<ProfileDetailsProps> = ({ user }) => {
    const { colorScheme, styles } = useTheme();
    const [friendCount, setFriendCount] = useState<string>('0');
    const { profileImage, handleImagePicker } = useProfileImage(user);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {


         const loadCurrentUser = async () => {
             try {
                const user = await fetchCurrentUser();
                setCurrentUser(user)
             } catch (error) {
             console.error('Error fetching user')
        }
       };

        const loadFriendCount = async () => {
            try {
                if (user) {
                    const count = await fetchFriendCount(user);
                    setFriendCount(count);
                    console.log(user?.createdAt);

                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        loadFriendCount();
        loadCurrentUser(); 
    }, [user]);


    return (
        <View style={{ paddingHorizontal: 15 }}>
            <View style={styles.buttonContainer}>
                {/* { } */}

                <TouchableOpacity onPress={handleImagePicker}>
                    <Image
                        style={styles.profilePicture}
                        source={
                            profileImage
                                ? { uri: profileImage }
                                : require('@/assets/images/profile-pic.jpg')
                        }
                    />
                </TouchableOpacity>


                <View style={{ width: 75, alignItems: 'center' }}>
                    <Text style={styles.label}>Friends</Text>
                    <Text style={styles.profileDetailText}>{friendCount}</Text>
                </View>


                <View style={{ width: 75, alignItems: 'center' }}>
                    <Text style={styles.label}>Points</Text>
                    <Text style={styles.profileDetailText}>0</Text>
                </View>
            </View>


            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 15 }}>
                <View>
                    <Text style={[styles.text, { fontSize: 20, fontWeight: '200' }]}>
                        {
                            user?.id === currentUser?.id
                                ? user?.bio || 'Insert your Bio!'
                                : user?.bio || ''
                        }</Text>
                </View>
            </View>


            <View style={styles.fullContainer}>
                <Text style={[styles.text, { padding: 0, fontWeight: '200' }]}>@{user?.username}</Text>
            </View>


            <View style={styles.fullContainer}>
                <Text style={[styles.text, { padding: 0, fontWeight: '100' }]}>Account Created:</Text>
                <Text style={[styles.text, { padding: 0, fontWeight: '100' }]}>
                    {user?.createdAt ?  new Date((user.createdAt)).toLocaleDateString("en-US") : "Loading"}
                </Text>
            </View>
        </View>
    );
};

export default ProfileDetails;

const style = StyleSheet.create({
    text: {
        fontSize: 24,
        fontWeight: '400',
        color: 'black',
    },
    bioText: {
        fontSize: 16,
        fontWeight: '400',
        color: 'black',
    }
});
