import React from 'react';
import { View, Text, Image } from 'react-native';
import sharedStyles from '@/constants/sharedStyles';

const SettingsHeader = () => {
    return (
        <View style={{ paddingHorizontal: 15, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 15 }}>
                <Image style={{ height: 125, width: 125 }} source={require('@/assets/images/profile-pic.jpg')} />
                <View style={{height: 50, margin: 12, borderWidth: 1, borderRadius: 25, padding: 10, backgroundColor: '#FFE5B4'}}>
                    <Text style={{ marginTop: '3.5%' }}>Edit profile picture</Text>
                </View>
            </View>
        </View>

    );
};

export default SettingsHeader;
