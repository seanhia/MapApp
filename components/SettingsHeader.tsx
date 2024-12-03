import React from 'react';
import { View, Text, Image } from 'react-native';

const SettingsHeader = () => {
    return (
        <View style={{ paddingHorizontal: 15 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 15 }}>
                <Image style={{ height: 100, width: 100 }} source={require('../assets/images/profile-pic.jpg')} />
                 <Text>Edit profile picture</Text>
            </View>
        </View>

    );
};

export default SettingsHeader;
