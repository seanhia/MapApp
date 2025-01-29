import React from 'react';
import { View, Text,Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { Colors } from '@/constants/Colors'


const ProfileHeader = () => {
    const { colorScheme, styles } = useTheme();
    const router = useRouter();
    return (
       
            <View style={{flexDirection:'row', justifyContent: 'space-between', padding: 20}} >
                
                <Text style={styles.heading}>Profile</Text>

                    <TouchableOpacity onPress={() => router.push('/screens/settings')}>
                        <Image 
                            style={[styles.profilePicture, { 
                                height: 30, 
                                width: 30, 
                                tintColor: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text}]} 
                            source={require('@/assets/images/setting-icon.png')}
                        />
                    </TouchableOpacity>
                    
            </View>

    );
};

export default ProfileHeader;

