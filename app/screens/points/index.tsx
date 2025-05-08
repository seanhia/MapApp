import { View, Text, Image } from "react-native";
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { User } from '@/data/types'
import { getTotalDistance, distanceThresholds } from '@/data/UserDataService';

interface PointsProps {
    user: User ;
};

const Points: React.FC<PointsProps> = ({user}) => {
    const { colorScheme, styles } = useTheme();
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [dis, setDist] = useState<number | null>(0);
    const firstThreshold = 50000;
 
    useEffect(() => {
        const fetchDistance = async () => {
            const total = await getTotalDistance(user.id) || 0;
            setDist(total);
            await distanceThresholds(user.id, total, firstThreshold);
        };
        fetchDistance();
    }, [user.id]);

    
    const progress = dis / firstThreshold;


    return (
        <View style={styles.centered}>
            <Text style={styles.header2}>POINTS</Text>
            <Image style={styles.spinGlobe} source={require('@/assets/images/spinglobe.gif')} />

            <Text style={styles.text}>
                {dis} / {firstThreshold} Meters
            </Text>

            <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
            </View>

            <Text>{Math.round(progress * 100)}%</Text>
            <Text style={[styles.text, { fontSize: 10, fontWeight: '200' }]}>*To obtain points: Upload a photo +20, Travel to a new city +50, Travel to a new country +100, Complete the distance thresholds above +250</Text>

        </View>
    );
};

export default Points 