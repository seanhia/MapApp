import React, { useState } from 'react';
import { View, Text, Modal, Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import sharedStyles from '@/constants/sharedStyles';


const uploadPhoto = () => {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={sharedStyles.centered}>
                    <View style={sharedStyles.modalView}>
                        <View style={sharedStyles.centered}>


                            <TouchableOpacity>
                                <Pressable>
                                    <Text style={sharedStyles.modalText}>Select from device</Text>
                                </Pressable>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Pressable>
                                    <Text style={sharedStyles.modalText}>Take a photo</Text>
                                </Pressable>
                            </TouchableOpacity>
                            <Pressable
                                style={sharedStyles.button}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={sharedStyles.text}>Cancel</Text>
                            </Pressable>
                        </View>

                    </View>

                </View>


            </Modal>
            <TouchableOpacity>
                <Pressable
                    style={sharedStyles.sideButton}
                    onPress={() => setModalVisible(true)}>
                    <Text style={sharedStyles.boldText}>Upload Photo</Text>

                </Pressable>
            </TouchableOpacity>

        </View>

    );

};

export default uploadPhoto;