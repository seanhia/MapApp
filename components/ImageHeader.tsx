import React, {Text, Image, View, StyleSheet} from 'react-native'
import sharedStyles from '@/constants/sharedStyles'
import { useTheme } from '@/hooks/useTheme'

export type ImageHeaderProps =  {
    image: string; 
    text: string; 
    // style: "half" | "full"
}

export function ImageHeader( {
    image, 
    text,
    // style
}:  ImageHeaderProps)  {
    const { colorScheme, styles } = useTheme();
    

    return (
        // <View style={style === 'half' ? styles.half : styles.full}>
        <View>
            <Text style={styles.title}>
                {text}
            </Text>
            <Image
                style={styles.image}
                source={image} // Directly use the passed `require()`
            />
        </View>
    )
}