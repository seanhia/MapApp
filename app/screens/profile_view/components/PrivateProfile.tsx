import React, {View, Text, Image} from 'react-native'
import { useTheme } from '@/hooks/useTheme'
import lock  from '@/assets/images/private.png'

export const PrivateProfile =  () => {
    const { styles } = useTheme(); 
    const privateProfileMsg = "This account is private"

    return (
        <View style={[{flex: 1, justifyContent: 'center', alignItems: 'center'}]}>
            <Image 
                source={lock}
                style={styles.image}
             />
            <Text style={styles.text}>{privateProfileMsg}</Text>

        </View>
    ); 
}