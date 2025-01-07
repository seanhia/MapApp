import React from 'react';
import { View, Text,Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import sharedStyles from '@/constants/sharedStyles';


const ProfileHeader = () => {
    const router = useRouter();
    return (
       
            <View style={{flexDirection:'row', justifyContent: 'space-between', padding: 20}} >
                
                <Text style={sharedStyles.heading}>Profile</Text>

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

