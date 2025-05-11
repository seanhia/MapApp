import React, { View, Text, Image } from 'react-native'
import { useTheme } from '@/hooks/useTheme'
import lock from '@/assets/images/private.png'
import { useEffect, useState } from 'react';
import { fetchCurrentUser } from '@/data/UserDataService';
import { User } from '@/data/types'
import { useTranslation } from 'react-i18next';


export const PrivateProfile = () => {
    const { styles } = useTheme();
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

    const privateProfileMsg =  t('private');


    return (
        <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
            <Image
                source={lock}
                style={styles.image}
            />
            <Text style={styles.text}>{privateProfileMsg}</Text>

        </View>
    );
}