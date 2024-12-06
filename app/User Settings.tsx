import SettingsHeader from '@/components/SettingsHeader';
import React, { useState } from 'react';
import { View, Text, Switch, Image, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import sharedStyles from '../constants/sharedStyles';
import { useRouter } from 'expo-router';

const UserSettings = () => {
    const router = useRouter();

    const [is_enable, setIsEnable] = useState(false);
    const toggleSwitch = () => setIsEnable(previousState => !previousState);

    const [display_name, onChangeDisplayName] = useState('');
    const [username, onChangeUsername] = useState('');
    const [bio, onChangeBio] = useState('');
    const [email, onChangeEmail] = useState('')
    const [password, onChangePassword] = useState('')
    const [phone_number, onChangePhoneNumber] = useState('')



    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SettingsHeader />
            <View style={sharedStyles.input}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>Private account</Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#FFE699' }}
                        thumbColor={is_enable ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={is_enable}
                    />
                </View>

            </View>

            <TextInput
                style={sharedStyles.input}
                onChangeText={onChangeDisplayName}
                value={display_name}
                placeholder="Display name"
            />
            <TextInput
                style={sharedStyles.input}
                onChangeText={onChangeUsername}
                value={username}
                placeholder="Username"
            />
            <TextInput
                style={sharedStyles.input}
                onChangeText={onChangeBio}
                value={bio}
                placeholder="Bio"
            />
            <TextInput
                style={sharedStyles.input}
                onChangeText={onChangeEmail}
                value={email}
                placeholder="Email"
            />
            <TextInput
                style={sharedStyles.input}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Password"
            />
            <TextInput
                style={sharedStyles.input}
                onChangeText={onChangePhoneNumber}
                value={phone_number}
                placeholder="Phone number"
            />
            <View style={sharedStyles.input}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <   Text>Tutorial</Text>
                    <TouchableOpacity  onPress={() => router.push('/tutorial')}>
                    <Text>press here</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default UserSettings;
