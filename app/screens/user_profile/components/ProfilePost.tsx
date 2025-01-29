import React, { useState } from 'react';
import { View, Text, Modal, Pressable,  Alert, Platform, PermissionsAndroid } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from '@/hooks/useTheme';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'; 




const uploadPhoto = () => {
    const { colorScheme, styles } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [imageUri, setImageUri] = useState<string | null>(null);

    const permission = async () => {

        if (Platform.OS == 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,{
                    title: 'Storage Permission',
                    message: 'App needs acess to your storage to upload a photo', 
                    buttonPositive: 'ok'

                }

            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true; // ios automatic 

    };

    const imagePicker = async () => {
        try {
            const permissionGranted = await permission();
            if (!permissionGranted) {
                Alert.alert('Permission Denied', 'Storage permission is required.');
                return;
            }

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
                    setImageUri(selectedImageUri);
                    setModalVisible(false);
                } else {
                    Alert.alert('Error', 'something went wrong while picking the image.')
                }
            }
        } catch (error){
            console.error('Error with image picker:', error);
            Alert.alert('Error', 'something went wrong while picking the image.')
        }
    };

    const takePhoto = async () => {
        try{
            const permissionGranted = await permission();
            if (!permissionGranted){
                Alert.alert('Permission Denied','Camera permission is required.')
                return;
            }
            const result = await launchCamera({
                mediaType: 'photo',
                quality: 1,
            });
            if(result.didCancel) {
                Alert.alert('Cancelled', 'You cancelled photo capture.')
            } else if (result.errorMessage) {
                Alert.alert('Error', result.errorMessage)
            } else if (result.assets && result.assets.length > 0) {
                const selectedImageUri = result.assets[0].uri;
                if (selectedImageUri) {
                    setImageUri(selectedImageUri);
                    setModalVisible(false);
                } else {
                    Alert.alert('Error', 'something went wrong while taking the picture.')
                }
            }

        } catch (error){
            console.error('Error with the camera')
        }

    };
 

    return (
        <View>
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
                                <Pressable>
                                    <Text style={styles.modalText}>Select from device</Text>
                                </Pressable>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={takePhoto}>
                                <Pressable
                                 onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.modalText}>Take a photo</Text>
                                </Pressable>
                            </TouchableOpacity>
                            <Pressable
                                style={styles.button}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.text}>Cancel</Text>
                            </Pressable>
                        </View>

                    </View>

                </View>


            </Modal>
            <TouchableOpacity>
                <Pressable
                    style={styles.sideButton}
                    onPress={() => setModalVisible(true)}>
                    <Text style={styles.buttonText}>Upload Photo</Text>

                </Pressable>
            </TouchableOpacity>

        </View>

    );

};

export default uploadPhoto;