import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Pressable, Alert, Platform, PermissionsAndroid } from 'react-native';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from '@/hooks/useTheme';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { fetchCurrentUser } from '@/data/UserDataService';
import { User } from '@/data/types'
import { useTranslation } from 'react-i18next';

interface UploadPhotoProps {
    onImageSelect: (uri: string) => void;
}

const UploadPhoto: React.FC<UploadPhotoProps> = ({ onImageSelect }) => {
    const { colorScheme, styles } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const { t } = useTranslation();
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [language, setSelectedLanguage] = useState<string>('en');

    useEffect(() => {
        const loadCurrentUser = async () => {
            try {
                const user = await fetchCurrentUser();
                setCurrentUser(user);

                const lang = user?.language || "en";
                setSelectedLanguage(lang);

            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        loadCurrentUser();
    }, []);


    const permission = async (type: 'gallery' | 'camera') => { // handels permission request based on action 

        if (Platform.OS == 'android') {
            let permissions = [PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE];
            if (type === 'camera') {
                permissions.push(PermissionsAndroid.PERMISSIONS.CAMERA);
            }

            const granted = await PermissionsAndroid.requestMultiple(permissions);

            return (
                granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED &&
                (type === 'gallery' || granted[PermissionsAndroid.PERMISSIONS.CAMERA] === PermissionsAndroid.RESULTS.GRANTED)

            )

        }
        return true; // ios automatic 

    };

    const imagePicker = async () => {
        try {
            const permissionGranted = await permission('gallery');
            if (!permissionGranted) {
                Alert.alert('Permission Denied', 'Storage permission is required.');
                return;
            }
            setModalVisible(false);

            const result = await launchImageLibrary({
                mediaType: 'photo',
                quality: 1,
            });

            if (result.didCancel) {
                Alert.alert('Cancelled', 'You cancelled image selection.');
            } else if (result.errorMessage) {
                Alert.alert('Error', result.errorMessage)
            } else if (result.assets && result.assets.length > 0) {
                const selectedImageUri = result.assets[0].uri;
                if (selectedImageUri) {
                    onImageSelect(selectedImageUri);
                } else {
                    Alert.alert('Error', 'something went wrong while picking the image.')
                }
            }
        } catch (error) {
            console.error('Error with image picker:', error);
            Alert.alert('Error', 'something went wrong while picking the image.')
        }
    };

    const takePhoto = async () => {
        try {
            const permissionGranted = await permission('camera');
            if (!permissionGranted) {
                Alert.alert('Permission Denied', 'Camera permission is required.')
                return;
            }
            setModalVisible(false);
            const result = await launchCamera({
                mediaType: 'photo',
                quality: 1,
            });
            if (result.didCancel) {
                Alert.alert('Cancelled', 'You cancelled photo capture.')
            } else if (result.errorMessage) {
                Alert.alert('Error', result.errorMessage)
            } else if (result.assets && result.assets.length > 0) {
                const selectedImageUri = result.assets[0].uri;
                if (selectedImageUri) {
                    onImageSelect(selectedImageUri);

                } else {
                    Alert.alert('Error', 'something went wrong while taking the picture.')
                }
            }

        } catch (error) {
            console.error('Error with the camera')
        }

    };


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ marginTop: 10 }}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centered}>
                        <View style={styles.modalView}>
                            <View style={styles.centered}>


                                <TouchableOpacity onPress={imagePicker}>

                                    <Text style={styles.modalText}>{t('select1')}</Text>

                                </TouchableOpacity>

                                <TouchableOpacity onPress={takePhoto}>
                                    <Text style={styles.modalText}>{t('select2')}</Text>
                                </TouchableOpacity>
                                <Pressable
                                    style={styles.button}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.buttonText}>{t('cancel')}</Text>
                                </Pressable>
                            </View>

                        </View>

                    </View>


                </Modal>
                <TouchableOpacity>
                    <Pressable
                        style={styles.sideButton}
                        onPress={() => setModalVisible(true)}>
                        <Text style={[styles.buttonText, { alignItems: 'center' }]}>{t('up_photo')}</Text>

                    </Pressable>
                </TouchableOpacity>

            </View>
        </GestureHandlerRootView>
    );

};

export default UploadPhoto;