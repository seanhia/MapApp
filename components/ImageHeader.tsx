import React, {Text, Image, View, StyleSheet} from 'react-native'
import sharedStyles from '@/constants/sharedStyles'

export type ImageHeaderProps =  {
    image: string; 
    text: string; 
    style: "wide" | "narrow"
}

export function ImageHeader( {
    image, 
    text,
    style
}:  ImageHeaderProps)  {

    return (
        <View style={sharedStyles.container}>
            <Text style={sharedStyles.title}>
                {text}
            </Text>
            <Image
                style={sharedStyles.image}
                source={image} // Directly use the passed `require()`
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 40,
        flex: .5,
        justifyContent: 'space-evenly',
  },
})
