import React, { useState, useEffect } from 'react';
import { View, Text, Image, Modal } from 'react-native';
import { GestureHandlerRootView, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { Colors } from '@/constants/Colors'
import Notifications from '../../notifications';
import { User } from '@/data/types'
import { fetchCurrentUser } from '@/data/UserDataService';
import { useTranslation } from 'react-i18next';


interface ProfileHeaderProps {
    user: User | null;

};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
    const { colorScheme, styles } = useTheme();
    const router = useRouter();

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

    const closeModal = () => {
        setModalVisible(false);
    };


    return (
        <SafeAreaView style={{ backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background }}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }} >

                    <Text style={[styles.heading, { padding: 0 }]}>{t('profile')}</Text>
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
                                <Notifications
                                    user={user} />
                                <TouchableOpacity style={styles.button}
                                    onPress={closeModal}>
                                    <Text style={{ color: 'white' }}>{t('close')}</Text>
                                </TouchableOpacity>


                            </View>
                        </View>
                    </Modal>
                </View>
            </GestureHandlerRootView>
        </SafeAreaView>
    );
};

export default ProfileHeader;

