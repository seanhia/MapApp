import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Alert } from 'react-native';

import { fetchFriendCount } from '@/data/Friendship';
import { User } from '@/data/types'
import { useTheme } from '@/hooks/useTheme';
import { useProfileImage } from '@/hooks/useProfileImage';
import { fetchCurrentUser, getPoints } from '@/data/UserDataService';
import Points from '../../Points';
import { useTranslation } from 'react-i18next';






interface ProfileDetailsProps {
    user: User | null;
};
const ProfileDetails: React.FC<ProfileDetailsProps> = ({ user }) => {
    const { colorScheme, styles } = useTheme();
    const [friendCount, setFriendCount] = useState<string>('-');
    const [points, setPoints] = useState<number | null>(null);
    const { profileImage, handleImagePicker } = useProfileImage(user);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const { t } = useTranslation();

    const [language, setSelectedLanguage] = useState<string>('en');



    useEffect(() => {


        const loadCurrentUser = async () => {
            try {
                const user = await fetchCurrentUser();
                setCurrentUser(user)

                const lang = user?.language || "en";
                setSelectedLanguage(lang);


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
                console.error('Error fetching user:', error);
            }
        };
        const loadPoints = async () => {
            try {
                const userPoints = await getPoints(user.id);
                setPoints(userPoints);
            } catch (error) {
                console.error('Error fetching points: ', error)
            }
        }
        loadFriendCount();
        loadCurrentUser();
        loadPoints();
    }, [user]);


    return (
        <View style={{ paddingHorizontal: 15 }}>
            <View style={styles.buttonContainer}>
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centered}>
                        <View style={styles.modalView}>
                            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                <Image style={styles.x} source={require('@/assets/images/X.png')} />
                            </TouchableOpacity>
                            <Points
                                user={currentUser} />
                        </View>

                    </View>



                </Modal>
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
                    <Text style={styles.label}>{t('friends')}</Text>
                    <Text style={styles.profileDetailText}>{friendCount}</Text>
                </View>


                <View style={{ width: 75, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.label}>{t('points')}</Text>
                        <Text style={styles.profileDetailText}>{points}</Text>
                    </TouchableOpacity>
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
                <Text style={[styles.text, { padding: 0, fontWeight: '100' }]}>{t('acc')}</Text>
                <Text style={[styles.text, { padding: 0, fontWeight: '100', marginBottom: 30 }]}>
                    {user?.createdAt ? new Date((user.createdAt)).toLocaleDateString("en-US") : "Loading"}
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
    },

    blurContainer: {
        flex: 1,
        padding: 20,
        margin: 16,
        textAlign: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 20,
    }



});
