import app, {auth} from "../../../firebase";

import { useState} from "react";
import { Text, View, StyleSheet, KeyboardAvoidingView, Button, ActivityIndicator } from "react-native";
import { TextInput } from "react-native-gesture-handler";
// import auth from '@react-native-firebase/auth';
import { FirebaseError } from 'firebase/app'
import {signUpWithEmail} from "@/auth";
import sharedStyles from '../../../constants/sharedStyles'; 

import { Redirect, router } from 'expo-router';




export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFName] = useState('');
  const [lastname, setLName] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    setLoading(true);
    try {
      const user = await signUpWithEmail(email, password, firstname, lastname, phone, username);
      router.replace('/screens/home');
    } catch (e: any) {
      const err = e as FirebaseError;
      alert('Registration failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={styles.container}
    >
      <KeyboardAvoidingView behavior="padding">
          <TextInput
            style={sharedStyles.input}
            value={firstname}
            onChangeText= {setFName}
            autoCapitalize="none"
            placeholder = "First Name"
            keyboardType="default"
            />
            <TextInput
            style={sharedStyles.input}
            value={lastname}
            onChangeText= {setLName}
            autoCapitalize="none"
            placeholder = "Last Name"
            keyboardType="default"
            />
            <TextInput
              style={sharedStyles.input}
              value={username}
              onChangeText={setUsername}
              keyboardType="default"
              placeholder = "Username"


            />
            <TextInput
            style={sharedStyles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder = "Email"
            />
            <TextInput
              style={sharedStyles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder = "Password"

            />
            <TextInput
              style={sharedStyles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder = "Phone Number"
              keyboardType="phone-pad"

            />
            {
              loading ? (
                <ActivityIndicator size={'small'} style ={{ margin: 28}} />
              ) : (
                <>
                  <Button onPress={signUp} title="Sign Up" />
                </>
              )}


        </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
});
// function auth() {
//   throw new Error("Function not implemented.");
// }

