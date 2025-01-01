import app, {auth} from "../firebase";

import { useState} from "react";
import { Text, View, StyleSheet, KeyboardAvoidingView, Button, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Link , router} from 'expo-router';
//import auth from '@react-native-firebase/auth';
import { FirebaseError } from 'firebase/app'
import {signUpWithEmail, signInWithEmail} from "../auth";
import sharedStyles from '../constants/sharedStyles'; 
import { Colors } from '../constants/Colors';





export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);


  const signIn = async () => {
    setLoading(true);
    try {
      const user = await signInWithEmail(email, password)
      router.replace('/screens/home');
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
      <Image
        style={sharedStyles.image}
        source={require('../assets/images/cloud.png')} 
      />
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
                  <TouchableOpacity style={sharedStyles.button} onPress={signIn}> 
                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Sign In</Text> 
                    </TouchableOpacity>
                  <Link href="/screens/sign_up">Don't have an account? Sign Up</Link>
                  <Link href="/screens/forgot_password">
                    <Text style={{ color: Colors.light.text, marginTop: 10 }}>Forgot Password?</Text>
                  </Link>
                  <Link href="/screens/home">
                    <Text style={{ color: Colors.light.text, marginTop: 10 }}>Go to Home (Temporary)</Text>
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

