import SettingsHeader from '@/components/SettingsHeader';
import React, { useState } from 'react';
import { View, Text, Switch, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const UserSettings = () => {

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
            <View style={{ height: 50, margin: 12, borderWidth: 1, padding: 10, backgroundColor: '#FBE8C5' }}>
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
                style={{ height: 50, margin: 12, borderWidth: 1, padding: 10, backgroundColor: '#FBE8C5' }}
                onChangeText={onChangeDisplayName}
                value={display_name}
                placeholder="Display name"
            />
            <TextInput
                style={{ height: 50, margin: 12, borderWidth: 1, padding: 10, backgroundColor: '#FBE8C5' }}
                onChangeText={onChangeUsername}
                value={username}
                placeholder="Username"
            />
            <TextInput
                style={{ height: 50, margin: 12, borderWidth: 1, padding: 10, backgroundColor: '#FBE8C5' }}
                onChangeText={onChangeBio}
                value={bio}
                placeholder="Bio"
            />
            <TextInput
                style={{ height: 50, margin: 12, borderWidth: 1, padding: 10, backgroundColor: '#FBE8C5' }}
                onChangeText={onChangeEmail}
                value={email}
                placeholder="Email"
            />
            <TextInput
                style={{ height: 50, margin: 12, borderWidth: 1, padding: 10, backgroundColor: '#FBE8C5' }}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Password"
            />
            <TextInput
                style={{ height: 50, margin: 12, borderWidth: 1, padding: 10, backgroundColor: '#FBE8C5' }}
                onChangeText={onChangePhoneNumber}
                value={phone_number}
                placeholder="Phone number"
            />
            <View style={{ height: 50, margin: 12, borderWidth: 1, padding: 10, backgroundColor: '#FBE8C5' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>Tutorial</Text>
                    <Text style={{ fontSize: 24 }}>></Text>
                </View>
            </View>




        </View>
    );
};

export default UserSettings;
