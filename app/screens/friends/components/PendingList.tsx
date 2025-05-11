import React, { useEffect, useState} from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useTheme } from '@/hooks/useTheme'
import { Friend, User } from "@/data/types"
import { fetchCurrentUser } from '@/data/UserDataService';
import { useTranslation } from 'react-i18next';


// import AcceptFriendship from "@/assets/data/AcceptFriendship";

interface PendingListProps {
    pending: Friend[];
    onAccept: (id: Friend) => void;
    onDeny: (id: Friend) => void;
}

const PendingList: React.FC<PendingListProps> = ({ pending, onAccept, onDeny }) => {
    const { colorScheme, styles } = useTheme();
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




    return (
        <FlatList
            style={{ marginBottom: 90 }}
            data={pending}
            keyExtractor={(item) => item.id}
            scrollEnabled={true}
            renderItem={({ item }) => (
                <View style={styles.buttonContainer}>
                    <Image source={require('@/assets/images/cloud.png')}
                        style={styles.profilePicture} />
                    <Text style={styles.boldText}>@{item.friendUsername}</Text>
                    <TouchableOpacity
                        style={styles.sideButton}
                        onPress={() => onAccept(item)}
                    >
                        <Text style={styles.buttonText}>{t('accept')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.sideButton}
                        onPress={() => onDeny(item)}
                    >
                        <Text style={styles.buttonText}>{t('deny')}</Text>
                    </TouchableOpacity>
                </View>

            )}
        />

    );
};


export default PendingList;