import React, {View, Text, Image} from 'react-native'
import { useTheme } from '@/hooks/useTheme'
import cloud  from '@/assets/images/cloud.png'
import ProfileDetails from '../../user_profile/components/ProfileDetails';

export const UserNotFound =  () => {
    const { styles } = useTheme(); 
    const notFoundMsg = "User not found"

    return (
        <View style={[{flex: 1, justifyContent: 'center', alignItems: 'center'}]}>
            <Image 
                source={cloud}
                style={styles.image}
             />
            <View style={{borderRadius: 8, borderColor: '#ddd'}}>
                <Text style={styles.text}>{notFoundMsg}</Text>
            </View>
            
        </View>
    ); 
}