import React, { useState } from 'react';
import { View, Text, Image, Modal } from 'react-native';
import { GestureHandlerRootView, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { Colors } from '@/constants/Colors'
import Notifications from '../../notifications';
import { User } from '@/data/types'

interface ProfileHeaderProps {
    user: User | null;

};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
    const { colorScheme, styles } = useTheme();
    const router = useRouter();

    const [modalVisible, setModalVisible] = useState(false);

    const closeModal = () => {
        setModalVisible(false);
      };


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }} >

                <Text style={styles.heading}>Profile</Text>
                <View style={{ flexDirection: 'row', gap: 15 }}>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Image
                            style={[styles.profilePicture, {
                                height: 30,
                                width: 30,
                                tintColor: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text
                            }]}
                            source={require('@/assets/images/bell .png')}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('/screens/passport')}>
                        <Image
                            style={[styles.profilePicture, {
                                height: 30,
                                width: 30,
                            }]}                          
                            source={require('@/assets/images/globe.png')}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('/screens/settings')}>
                        <Image
                            style={[styles.profilePicture, {
                                height: 30,
                                width: 30,
                                tintColor: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text
                            }]}
                            source={require('@/assets/images/setting-icon.png')}
                        />
                    </TouchableOpacity>
                </View>
                <Modal
                    visible={modalVisible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={closeModal}>
  
                    <View style={styles.modalOverlay}>
                        <View style={styles.notificationDrawer}>
                            <ScrollView>
                                <Notifications 
                                user = {user}/>
                            </ScrollView>
                            
                            <TouchableOpacity style={styles.button}
                                 onPress={closeModal}>
                                <Text style={{ color: 'white' }}>Close</Text>
                            </TouchableOpacity>
                  
                            
                        </View>
                    </View>
                </Modal>
            </View>
        </GestureHandlerRootView>
    );
};

export default ProfileHeader;

