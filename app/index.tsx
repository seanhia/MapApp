import app, {auth} from "../firebase";

import { useState} from "react";
import { Text, View, StyleSheet, KeyboardAvoidingView, Button, ActivityIndicator } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Link , router} from 'expo-router';
//import auth from '@react-native-firebase/auth';
import { FirebaseError } from 'firebase/app'
import {signUpWithEmail, signInWithEmail} from "../auth";
import sharedStyles from '../constants/sharedStyles'; 





export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);


  const signIn = async () => {
    setLoading(true);
    try {
      const user = await signInWithEmail(email, password)
      router.replace('/home');
    } catch (e: any) {
      const err = e as FirebaseError;
      alert('Sign in failed: ' + err.message);
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
            {
              loading ? (
                <ActivityIndicator size={'small'} style ={{ margin: 28}} />
              ) : (
                <>
                  <Button onPress={signIn} title="Sign In" />
                  <Link href="/signUp">Sign Up</Link>
                  <Link href="/forgotPassword">
                    <Text style={{ color: 'blue', marginTop: 10 }}>Forgot Password?</Text>
                  </Link>
                  <Link href="/home">
                    <Text style={{ color: 'blue', marginTop: 10 }}>Go to Home (Temporary)</Text>
                  </Link>
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

