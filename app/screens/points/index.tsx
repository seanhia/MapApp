import { View, Text, Image  } from "react-native";
import { useTheme } from '@/hooks/useTheme';

const Points = () => {
    const { colorScheme, styles } = useTheme();
    const currentMeters = 1000;
    const goalMeters = 100000;
    const progress = currentMeters/goalMeters;

    return (
        <View style={styles.centered}>
            <Text style={styles.header2}>POINTS</Text>
            <Image style={styles.spinGlobe}source={require('@/assets/images/spinglobe.gif')} />

            <Text style={styles.text}>
                {currentMeters} / {goalMeters} Meters
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