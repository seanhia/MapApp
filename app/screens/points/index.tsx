import { View, Text } from "react-native";
import { useTheme } from '@/hooks/useTheme';

const Points = () => {
    const { colorScheme, styles } = useTheme();
    return (
        <View >

            <Text style={styles.label}>POINTS</Text>
        </View>
    );
};

export default Points 