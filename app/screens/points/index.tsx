import { View, Text, Image } from "react-native";
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { User } from '@/data/types'
import { getTotalDistance, UserProgress, getUserProgress, updatePoints } from '@/data/UserDataService';
import ConfettiCannon from 'react-native-confetti-cannon';
import { fetchCurrentUser } from '@/data/UserDataService';
import { useTranslation } from 'react-i18next';



interface PointsProps {
    user: User;
};

const Points: React.FC<PointsProps> = ({ user }) => {
    const { colorScheme, styles } = useTheme();
    const [dis, setDist] = useState<number | null>(0);
    const [level, setLevel] = useState<number>(1);
    const [threshold, setThreshold] = useState<number>(50000);
    const [showConfetti, setShowConfetti] = useState<boolean>(false);
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

        const fetchDistance = async () => {
            //get distance traveled 
            const total = await getTotalDistance(user.id) || 0;

            setDist(total);

            //set first level and threshold 
            let userLevel = 1;
            let userThreshold = 50000;

            //fetch user progress
            const progress = await getUserProgress(user.id);
            //if progress assign the level and threshold accordingly 
            if (progress) {
                userLevel = progress.currentLevel;
                userThreshold = progress.currentThreshold;
            } else { // if no progress found save progress to database 
                await UserProgress(user.id, level, threshold)
            } // if distnace travel is great than threhold update level & threshold display Confetti 
            //update points and progress to database 
            if (total >= userThreshold) {

                const newLevel = userLevel + 1;
                const newThreshold = userThreshold + 50000;

                setLevel(newLevel);
                setThreshold(newThreshold);
                setShowConfetti(true);

                await UserProgress(user.id, newLevel, newThreshold);
                await updatePoints(user.id, 250);
            } else {
                setLevel(userLevel);
                setThreshold(userThreshold);
            }

        };

        fetchDistance();
    }, [user.id, threshold]);


    const progress = dis / threshold;


    return (
        <View style={styles.centered}>
            <Text style={styles.header2}>{t('pts')}</Text>
            <Image style={styles.spinGlobe} source={require('@/assets/images/spinglobe.gif')} />

            <Text style={styles.text}>
                {dis} / {threshold} {t('m')}
            </Text>

            <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
            </View>

            <Text>{Math.round(progress * 100)}%</Text>
            <Text style={[styles.text, { fontSize: 11, fontWeight: '200' }]}>{t('rules')}</Text>
            {showConfetti && <ConfettiCannon count={100} origin={{ x: 0, y: 0 }} fadeOut />}
        </View>
    );
};

export default Points 