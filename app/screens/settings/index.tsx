import SettingsHeader from './SettingsHeader';
import React, { useState } from 'react';
import { View, Text, Switch, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import sharedStyles from '@/constants/sharedStyles';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors'

const UserSettings = () => {
    const router = useRouter();

    const [isPrivateAccount, setIsPrivateAccount] = useState(false);
    const [displayName, setDisplayName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const toggleSwitch = () => setIsPrivateAccount(prevState => !prevState);


    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.header}>Settings</Text>

                <View style={styles.card}>
                    <View style={styles.rowBetween}>
                        <Text style={styles.label}>Private Account</Text>
                        <Switch
                            trackColor={{ false: '#aaa', true: Colors.light.tint }}
                            thumbColor={isPrivateAccount ? '#f5dd4b' : '#f4f3f4'}
                            onValueChange={toggleSwitch}
                            value={isPrivateAccount}
                        />
                    </View>

                </View>
                
                <View style={styles.card}> 
                    {/* <Text style={styles.sectionHeader}>Profile Information</Text> */}

                    <TextInput
                        style={sharedStyles.input}
                        onChangeText={setDisplayName}
                        value={displayName}
                        placeholder="Display Name"
                        placeholderTextColor="#aaa"
                    />

                    <TextInput
                        style={sharedStyles.input}
                        onChangeText={setUsername}
                        value={username}
                        placeholder="Username"
                        placeholderTextColor="#aaa"
                    />

                    <TextInput
                        style={sharedStyles.input}
                        onChangeText={setBio}
                        value={bio}
                        placeholder="Bio"
                        placeholderTextColor="#aaa"
                    />
                {/* </View> */}

                {/* <View style={styles.card}> */}
                    {/* <Text style={styles.sectionHeader}>Contact Information</Text> */}

                    <TextInput
                        style={sharedStyles.input}
                        onChangeText={setEmail}
                        value={email}
                        placeholder="Email"
                        placeholderTextColor="#aaa"
                        keyboardType="email-address"
                    />

                    <TextInput
                        style={sharedStyles.input}
                        onChangeText={setPhoneNumber}
                        value={phoneNumber}
                        placeholder="Phone Number"
                        placeholderTextColor="#aaa"
                        keyboardType="phone-pad"
                    />
                {/* </View> */}

                {/* <View style={styles.card}> */}
                    {/* <Text style={styles.sectionHeader}>Security</Text> */}

                    <TextInput
                        style={sharedStyles.input}
                        onChangeText={setPassword}
                        value={password}
                        placeholder="Password"
                        placeholderTextColor="#aaa"
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity style={styles.tutorialButton} onPress={() => router.push('/screens/tutorial')}>
                    <Text style={styles.tutorialText}>View Tutorial</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default UserSettings;

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 16,
        // backgroundColor: '#fff',
    },
    // container: {
    //     flex: 1,
    // },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 50,
        textAlign: 'center',
    },
    card: {
        // backgroundColor: '#fff',
        borderRadius: 8,
        padding: 30,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0,
        shadowRadius: 4,
        elevation: 3,
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
    },
    // sectionHeader: {
    //     fontSize: 18,
    //     fontWeight: '600',
    //     marginBottom: 8,
    // },
    // input: {
    //     borderWidth: 1,
    //     borderColor: '#ddd',
    //     borderRadius: 8,
    //     padding: 12,
    //     marginBottom: 12,
    //     backgroundColor: '#f9f9f9',
    // },
    tutorialButton: {
        backgroundColor: Colors.light.background,
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 16,
    },
    tutorialText: {
        color: Colors.light.text,
        fontSize: 16,
        fontWeight: '600',
    },
});
