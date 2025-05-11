import { useTheme } from '@/hooks/useTheme';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { getCitiesSize, getTotalDistance } from '@/data/UserDataService';
import { getAuth, deleteUser as authDeleteUser } from 'firebase/auth';
import { fetchCurrentUser } from '@/data/UserDataService';
import { User } from '@/data/types'
import { useTranslation } from 'react-i18next';




const ProfileStatistics = () => {
    const { colorScheme, styles } = useTheme();
    const [info, setData] = useState<number | null>(0);
    const [dis, setDist] = useState<number | null>(0);
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
        

        const fetchData = async () => {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            const citiesSize = await getCitiesSize(currentUser.uid);
            const babyDistance = await getTotalDistance(currentUser.uid);
            setData(citiesSize)
            setDist(babyDistance)
        }


        fetchData();
        loadCurrentUser();

    }, []);

    return (
        <View style={[styles.fullContainer, { paddingBottom: 200 }]}>
            <Text style={styles.heading}>{t('stats')}</Text>
            <View style={styles.profileContainer}>
                <Image style={style.statsImage} source={require('@/assets/images/distance.jpg')} />
                <Image style={style.statsImage} source={require('@/assets/images/city.jpg')} />
                <Image style={style.statsImage} source={require('@/assets/images/globe.jpg')} />
            </View>
            <View style={styles.profileContainer}>
                <Text>{t('dis')}</Text>
                <Text>{t('city')}</Text>
                <Text>{t('count')}</Text>

            </View>
            <View style={styles.profileContainer}>
                <Text>{dis} m</Text>
                <Text>{info}</Text>
                <Text>1</Text>
            </View>

        </View>

    );
};

export default ProfileStatistics;

const style = StyleSheet.create({
    statsImage: {
        height: 100, width: 100
    },

})

