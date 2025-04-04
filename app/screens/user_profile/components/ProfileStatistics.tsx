import { useTheme } from '@/hooks/useTheme';
import React, {useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { getCitiesSize, getTotalDistance } from '@/data/UserDataService';
import { getAuth, deleteUser as authDeleteUser  } from 'firebase/auth';


const ProfileStatistics = () => {
    const { colorScheme, styles } = useTheme();
    const [info, setData] = useState<number | null>(0);
    const [dis, setDist] = useState<number | null>(0);
    useEffect(() => {
            const fetchData = async () => {
                const auth = getAuth();
                const currentUser = auth.currentUser;
                const citiesSize = await getCitiesSize(currentUser.uid);
                const babyDistance = await getTotalDistance(currentUser.uid);
                setData(citiesSize)
                setDist(babyDistance)
            }
    

            fetchData();

        }, []);
    
    return (
        <View style={[styles.fullContainer, { paddingBottom: 200 }]}>
            <Text style={styles.header}>Statistics</Text>
            <View style={styles.profileContainer}>
                <Image style={style.statsImage} source={require('@/assets/images/distance.jpg')} />
                <Image style={style.statsImage} source={require('@/assets/images/city.jpg')} />
                <Image style={style.statsImage} source={require('@/assets/images/globe.jpg')} />
            </View>
            <View style={styles.profileContainer}>
                <Text>Distance Traveled</Text>
                <Text>Cities Visited</Text>
                <Text>Countries Visited</Text>

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

