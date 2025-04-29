import { View, ImageBackground} from "react-native";
import { useTheme } from '@/hooks/useTheme';
import { BlurView } from 'expo-blur';

const points = () => {
    const { colorScheme, styles } = useTheme();
    return (
        <View style = {styles.centerContainer}>
            <BlurView
          intensity={90} tint="dark" style={styles.blurContainer}
        />

        </View>
    );
};

export default points 