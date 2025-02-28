import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Platform, PermissionsAndroid } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';  //install this

import { fetchFriendCount } from '@/data/FriendshipQuery';
import { User } from '@/data/types'
import { useTheme } from '@/hooks/useTheme';
import { fetchCurrentUser } from '@/data/UserDataService';
import { storage } from '@/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, setDoc, updateDoc, collection, getDocs, query, where, deleteDoc } from 'firebase/firestore';
import db from '@/firestore';


interface ProfileDetailsProps {
    user: User | null;
    //    onViewProfile: (id: Friend) => void;
    //    onUnfriend: (id: Friend) => void;
};
const ProfileDetails: React.FC<ProfileDetailsProps> = ({ user }) => {
    const { colorScheme, styles } = useTheme();
    const [friendCount, setFriendCount] = useState<string>('0');
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {


         const loadCurrentUser = async () => {
             try {
                const user = await fetchCurrentUser();
                setCurrentUser(user)
                console.log("current user: " )
                console.log(user?.createdAt);

             } catch (error) {
             console.error('Error fetching user')
        }
       };

        const loadFriendCount = async () => {
            try {
                if (user) {
                    const count = await fetchFriendCount(user);
                    setFriendCount(count);
                }
            } catch (error) {
                console.error('Error fetching friends or users:', error);
            }
        };


        const loadProfilePicture = async () => {
            try {
                if (user) {
                    const userDocRef = doc(db, 'users', user.id);
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        if (userData && userData.profilePhoto) {
                            setProfileImage(userData.profilePhoto);
                        }
                    }
                }

            } catch (error) {
                console.error('Error fetching profile picture:', error);
            }
        };

        loadFriendCount();
        loadProfilePicture();
        loadCurrentUser(); 
    }, [user]);


    const profilePictureFirebase = async (imageUri: string) => {
        try {
            if (!user) {
                Alert.alert('Error', 'Could not fetch current user');
                return;
            }


            const response = await fetch(imageUri);
            const blob = await response.blob();

            const storageRef = ref(storage, `profile_pictures/${user.id}`);
            await uploadBytes(storageRef, blob);

            const downloadURL = await getDownloadURL(storageRef);
            setProfileImage(downloadURL);

            const userDocRef = doc(db, 'users', user.id);
            await setDoc(userDocRef, { profilePhoto: downloadURL }, { merge: true });



        } catch (error) {
            console.error('Error uploading image:', error);
            Alert.alert('Upload Failed', 'Could not upload profile picture.');
        }

    };

    const handleImagePicker = async () => {

        try {
            // Request permissions for Android
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission',
                        message: 'App needs access to your storage to select profile pictures.',
                        buttonPositive: 'OK',
                    }
                );

                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    Alert.alert('Permission Denied', 'Storage permission is required.');
                    return;
                }
            }


            const result = await launchImageLibrary({
                mediaType: 'photo',
                quality: 1,
            });

            if (result.didCancel) {
                Alert.alert('Cancelled', 'You cancelled image selection.');
            } else if (result.errorMessage) {
                Alert.alert('Error', result.errorMessage);
            } else if (result.assets && result.assets.length > 0) {
                const imageUri = result.assets[0].uri;


                if (imageUri) {
                    setProfileImage(imageUri);
                    await profilePictureFirebase(imageUri);
                } else {
                    Alert.alert('Invalid Image', 'The selected image could not be loaded.');
                }
            }
        } catch (error) {
            console.error("Error with image picker:", error);
            Alert.alert('Error', 'Something went wrong while picking the image.');
        }
    };

    return (
        <View style={{ paddingHorizontal: 15 }}>
            <View style={styles.buttonContainer}>
                { }

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
