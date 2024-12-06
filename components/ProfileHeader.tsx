import React from 'react';
import { View, Text,Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';


const ProfileHeader = () => {
    const router = useRouter();
    return (
        <View style={{paddingHorizontal: 15, paddingTop: 10, height: 55}} >
            <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems:'center'}} >
                <Text style={{fontSize: 24, fontWeight: '500', color: 'black'}}>Profile Page</Text>
                <View style={{flexDirection: 'row', alignItems:'center'}}>
                    <TouchableOpacity onPress={() => router.push('/User Settings')}>
                        <Image 
                            style={{height: 30, width: 30, tintColor: 'black'}} 
                            source={require('../assets/images/setting-icon.png')}
                        />
                    </TouchableOpacity>
                    
                </View>
            </View>

        </View>
    );
};

export default ProfileHeader;

