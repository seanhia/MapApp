import { View, Text, ActivityIndicator } from 'react-native'
import { useTheme } from '@/hooks/useTheme'

export function Loading() {
    const { styles } = useTheme() 
    return (
        <View style={styles.fullContainer}>
            <ActivityIndicator size={'small'} style ={{ margin: 28}} /> 
        </View>
    )

} 