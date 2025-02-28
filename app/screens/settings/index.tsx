import React, { useState, useEffect } from 'react';
import { View, Text, Switch, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import { useTheme } from '@/hooks/useTheme';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors'
import { Link } from 'expo-router';
import {changeEmail, singOutUser} from "@/auth";
import { deleteUser } from '@/data/UserDataService';


import { fetchCurrentUser, writeUserData, writeUserLeaderboard , fetchCurrentUserLeaderboard} from '@/data/UserDataService';
import { Leaderboard, User } from '@/data/types'

const UserSettings = () => {
    
    const { colorScheme, styles } = useTheme();
    const router = useRouter();

    const [isPrivateAccount, setIsPrivateAccount] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userLeaderboard, setUserBoard] = useState<Leaderboard | null>(null)
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
        const loadUserLeaderboard = async () => {
            try {
                const userboard = await fetchCurrentUserLeaderboard();
                setUserBoard(userboard);
            } catch (e) {
                console.log("Error fetching user leaderboard:", e)
            }
        }
        loadUserLeaderboard();
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
        const updatedLeaderboard: Leaderboard = {
            ...userLeaderboard,
            username
        }
        try {
            await writeUserData(updatedUser);
            await writeUserLeaderboard(updatedLeaderboard)
            alert('Settings updated successfully!');
            console.log(updatedUser)
            console.log(currentUser)
        } catch (error) {
            console.error('Failed to update settings:', error);
            alert('Error updating settings. Please try again.');
        }
    }
    const handleDeleteAccount = async () => {
        try {
            const confirmDeny = window.confirm("Are you sure you want to delete your account?");

            if (currentUser && confirmDeny) {

                await deleteUser(currentUser.id)
            }
        } catch (error) {
            console.log("Error: ", error, ". Unable to delete account.")
        }
    }
    
    const handleSignOut = async () => {
        try {
            singOutUser();
            router.push('/');
        } catch (e) {
            throw (e)
        }
    }



    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background, flex: 1}}>
            <View>
                <Text style={[styles.heading, {padding:16}]}>Settings</Text>

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
                        style={styles.placeHolderInput}
                        onChangeText={setUsername}
                        value={username}
                        placeholder="Username"
                        // placeholderTextColor= "#fffff6"
                    />

                    <TextInput
                        style={styles.placeHolderInput}
                        onChangeText={setBio}
                        value={bio}
                        placeholder="Bio"
                        // placeholderTextColor="#aaa"
                    />
             
                    <TextInput
                        style={styles.placeHolderInput}
                        onChangeText={setEmail}
                        value={eMail}
                        placeholder={"Email"}
                        // placeholderTextColor="#aaa"
                        keyboardType="email-address"
                    />

                    <TextInput
                        style={styles.placeHolderInput}
                        onChangeText={setPhoneNumber}
                        value={phoneNumber}
                        placeholder="Phone Number"
                        // placeholderTextColor="#aaa"
                        keyboardType="phone-pad"
                    />
                    <TouchableOpacity style={styles.lightButton} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>
                            Submit Chanages
                        </Text>
                    </TouchableOpacity>
      
                </View>

                <TouchableOpacity style={styles.lightButton} onPress={() => router.push('/screens/change_password')}>
                    <Text style={styles.buttonText}>Change Password</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.lightButton} onPress={() => router.push('/screens/tutorial')}>
                    <Text style={styles.buttonText}>View Tutorial</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.lightButton} onPress={handleDeleteAccount}>
                    <Text style={styles.buttonText}>Delete Account</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.lightButton} onPress={handleSignOut}>
                    <Text style={styles.buttonText}>Log Out</Text> 
                </TouchableOpacity>


            </View>
        </ScrollView>
        </GestureHandlerRootView>
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
