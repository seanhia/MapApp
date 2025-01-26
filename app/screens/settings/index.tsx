import React, { useState, useEffect } from 'react';
import { View, Text, Switch, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import sharedStyles from '@/constants/sharedStyles';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors'
import { Link } from 'expo-router';


import { fetchCurrentUser, writeUserData } from '@/data/UserDataService';
import { User } from '@/data/types'

const UserSettings = () => {
    const router = useRouter();

    const [isPrivateAccount, setIsPrivateAccount] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [eMail, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');


    useEffect(() => {
        const loadCurrentUser = async () => {
            try {
                const user = await fetchCurrentUser();
                setCurrentUser(user);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        loadCurrentUser();
    }, []);

    useEffect(() => {
        if (currentUser) {
            setUsername(currentUser.username || '');
            setBio(currentUser.bio || '');
            setEmail(currentUser.eMail || '');
            setPhoneNumber(currentUser.phoneNumber || '');
            setIsPrivateAccount(currentUser.isPrivate || false);
        }
    }, [currentUser]);

    const toggleSwitch = () => setIsPrivateAccount((prev) => !prev);

    const handleSubmit = async () => {
        if (!currentUser) {
            alert('No user data found.');
            return;
        }
        const updatedUser: User = {
            ...currentUser,
            username,
            bio,
            eMail,
            phoneNumber,
            'isPrivate': isPrivateAccount,
        };
        try {
            await writeUserData(updatedUser);
            alert('Settings updated successfully!');
            console.log(updatedUser)
            console.log(currentUser)
        } catch (error) {
            console.error('Failed to update settings:', error);
            alert('Error updating settings. Please try again.');
        }
    }
       



    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={sharedStyles.fullContainer}>
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
             
                    <TextInput
                        style={sharedStyles.input}
                        onChangeText={setEmail}
                        value={eMail}
                        placeholder={"Email"}
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
      
                    <TextInput
                        style={sharedStyles.input}
                        onChangeText={setPassword}
                        value={password}
                        placeholder="Password"
                        placeholderTextColor="#aaa"
                        secureTextEntry
                    />
                    <Link style={sharedStyles.input} href="/screens/settings/UpdatePassword">Change Password</Link>
                </View>


                <TouchableOpacity style={sharedStyles.lightButton} onPress={handleSubmit}>
                    <Text>
                        Submit Chanages
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={sharedStyles.lightButton} onPress={() => router.push('/screens/tutorial')}>
                    <Text style={styles.tutorialText}>View Tutorial</Text>
                </TouchableOpacity>


            </View>
        </ScrollView>
    );
};


export default UserSettings;

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 12,
    },
    container: {
        flex: 1,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 50,
        textAlign: 'center',
    },
    card: {
        borderRadius: 8,
        padding: 20,
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
