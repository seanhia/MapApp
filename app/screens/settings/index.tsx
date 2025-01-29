import React, { useState, useEffect } from 'react';
import { View, Text, Switch, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useTheme } from '@/hooks/useTheme';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors'
import { Link } from 'expo-router';
import {changeEmail} from "@/auth";



import { fetchCurrentUser, writeUserData } from '@/data/UserDataService';
import { User } from '@/data/types'

const UserSettings = () => {
    const { colorScheme, styles } = useTheme();
    const router = useRouter();

    const [isPrivateAccount, setIsPrivateAccount] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [eMail, setEmail] = useState('');
    // const [password, setPassword] = useState('');
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
            setIsDarkMode(currentUser.isDarkMode || false);
        }
    }, [currentUser]);

    const togglePrivate = () => setIsPrivateAccount((prev) => !prev);
    const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

    const handleSubmit = async () => {
        try { 
        await changeEmail(eMail);
        } catch(e) {
            alert(e)
            return
        }
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
            'isDarkMode': isDarkMode,
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
            <View>
                <Text style={style.header}>Settings</Text>

                <View style={style.card}>
                    <View style={style.rowBetween}>
                        <Text style={styles.label}>Private Account</Text>
                        <Switch
                            trackColor={{ false: '#aaa', true: Colors.light.tint }}
                            thumbColor={isPrivateAccount ? '#f5dd4b' : '#f4f3f4'}
                            onValueChange={togglePrivate}
                            value={isPrivateAccount}
                        />
                        <Text style={styles.label}>Dark Mode</Text>
                        <Switch
                            trackColor={{ false: '#aaa', true: Colors.light.tint }}
                            thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
                            onValueChange={toggleDarkMode}
                            value={isDarkMode}
                        />
                    </View>

                </View>
                
                <View style={style.card}> 

                    <TextInput
                        style={styles.input}
                        onChangeText={setUsername}
                        value={username}
                        placeholder="Username"
                        placeholderTextColor= "#aaa"
                    />

                    <TextInput
                        style={styles.input}
                        onChangeText={setBio}
                        value={bio}
                        placeholder="Bio"
                        placeholderTextColor="#aaa"
                    />
             
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        value={eMail}
                        placeholder={"Email"}
                        placeholderTextColor="#aaa"
                        keyboardType="email-address"
                    />

                    <TextInput
                        style={styles.input}
                        onChangeText={setPhoneNumber}
                        value={phoneNumber}
                        placeholder="Phone Number"
                        placeholderTextColor="#aaa"
                        keyboardType="phone-pad"
                    />
                    <TouchableOpacity style={styles.lightButton} onPress={handleSubmit}>
                        <Text style={style.tutorialText}>
                            Submit Chanages
                        </Text>
                    </TouchableOpacity>
      
                </View>

                <TouchableOpacity style={styles.lightButton} onPress={() => router.push('/screens/change_password')}>
                    <Text style={style.tutorialText}>Change Password</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.lightButton} onPress={() => router.push('/screens/tutorial')}>
                    <Text style={style.tutorialText}>View Tutorial</Text>
                </TouchableOpacity>


            </View>
        </ScrollView>
    );
};


export default UserSettings;

const style = StyleSheet.create({
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
