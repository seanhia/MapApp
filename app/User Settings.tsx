import SettingsHeader from '@/components/SettingsHeader';
import React from 'react';
import { View, Text,Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const UserSettings = () => {

    
    return(
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <SettingsHeader/>
            <TextInput style={{height: 50, margin:12, borderWidth:1, padding: 10 }}>
            </TextInput>
        </View>
    );
};

export default UserSettings;
