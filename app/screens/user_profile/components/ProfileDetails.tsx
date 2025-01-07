import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,  Image, TouchableOpacity, Alert, Platform, PermissionsAndroid } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';  //install this

import { fetchFriendCount } from '@/data/FriendshipQuery';
import { fetchCurrentUser } from '@/data/UserDataService';
import { User } from '@/data/types'
import sharedStyles from '@/constants/sharedStyles';



const ProfileDetails : React.FC = ({  }) => {
    

    const [friendCount, setFriendCount] = useState<string | null>(null);
    const [profileImage, setProfileImage] = useState<string | null>(null);

    

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
            <View style={sharedStyles.buttonContainer}>
                {}
    
                <TouchableOpacity onPress={handleImagePicker}>
                    <Image
                        style={sharedStyles.profilePicture} 
                        source={
                            profileImage
                                ? { uri: profileImage } 
                                : require('@/assets/images/profile-pic.jpg') 
                        }
                    />
                </TouchableOpacity>

                
                <View style={{ width: 75, alignItems: 'center' }}>
                    <Text style={style.text}>Friends</Text>
                    <Text>{friendCount}</Text>
                </View>

                {}
                <View style={{ width: 75, alignItems: 'center' }}>
                    <Text style={style.text}>Points</Text>
                    <Text style={style.text}>1679</Text>
                </View>
            </View>

        
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 15 }}>
                <View>
                    <Text style={style.text}>Bio</Text>
                    <Text style={style.text}>~~~~~~~~~~~~~~~~~~~~~</Text>
                </View>
            </View>

            
            <View>
                <Text style={sharedStyles.text}>@Username</Text>
            </View>

            
            <View style={sharedStyles.fullContainer}>
                <Text style={{ fontWeight: '100' }}>Account Created</Text>
                <Text style={{ fontWeight: '100' }}>11/30/24</Text>
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
    }
});
