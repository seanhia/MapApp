import React from 'react';
import { View, Text,Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';


const ProfileHeader = () => {
    const { colorScheme, styles } = useTheme();
    const router = useRouter();
    return (
       
            <View style={{flexDirection:'row', justifyContent: 'space-between', padding: 20}} >
                
                <Text style={styles.heading}>Profile</Text>

                    <TouchableOpacity onPress={() => router.push('/screens/settings')}>
                        <Image 
                            style={{height: 30, width: 30, tintColor: 'black'}} 
                            source={require('@/assets/images/setting-icon.png')}
                        />
                    </TouchableOpacity>
                    
            </View>

    );
};

export default ProfileHeader;

