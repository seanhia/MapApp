import { useState, useEffect } from 'react';
import { Alert, Platform, PermissionsAndroid } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker'; 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { storage } from '@/firebase';
import db from '@/firestore';
import { User } from '@/data/types';

export const useProfileImage = (user: User | null) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Fetch the profile image from Firestore
  useEffect(() => {
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

    loadProfilePicture();
  }, [user]);

  // Handle Image Picker (for updating profile photo)
  const handleImagePicker = async () => {
    try {
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
          await uploadProfilePicture(imageUri);
        } else {
          Alert.alert('Invalid Image', 'The selected image could not be loaded.');
        }
      }
    } catch (error) {
      console.error("Error with image picker:", error);
      Alert.alert('Error', 'Something went wrong while picking the image.');
    }
  };

  // Upload the selected image to Firebase
  const uploadProfilePicture = async (imageUri: string) => {
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

  return {
    profileImage,
    handleImagePicker,
  };
};
