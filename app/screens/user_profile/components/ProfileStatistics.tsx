import { useTheme } from '@/hooks/useTheme';
import React, {useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { getCitiesSize } from '@/data/UserDataService';
import { getAuth, deleteUser as authDeleteUser  } from 'firebase/auth';


const ProfileStatistics = () => {
    const { colorScheme, styles } = useTheme();
    const [info, setData] = useState<number | null>(0);
    useEffect(() => {
            const fetchData = async () => {
                const auth = getAuth();
                const currentUser = auth.currentUser;
                const citiesSize = await getCitiesSize(currentUser.uid);
                setData(citiesSize)
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
                <Text>2462 m</Text>
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

