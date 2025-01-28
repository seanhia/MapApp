import app, {auth} from "../../../firebase";

import { useState} from "react";
import { Text, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity , ActivityIndicator } from "react-native";
import { TextInput } from "react-native-gesture-handler";
// import auth from '@react-native-firebase/auth';
import { FirebaseError } from 'firebase/app'
import {signUpWithEmail} from "@/auth";
import { useTheme } from '@/hooks/useTheme'; 

import { Redirect, router, Link } from 'expo-router';
import {Colors} from '@/constants/Colors'

import { ImageHeader} from '@/components/ImageHeader'

export default function SignUp() {
  const { colorScheme, styles } = useTheme();
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
    <View style={{backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background, flex: 1}}>
      <View
        style={styles.centerContainer}
      >
        <ImageHeader
        image={require("@/assets/images/cloud.png")}
        text ="Sign Up"
        />
        <KeyboardAvoidingView behavior="padding">
            <TextInput
              style={styles.input}
              value={firstname}
              onChangeText= {setFName}
              autoCapitalize="none"
              placeholder = "First Name"
              keyboardType="default"
              />
              <TextInput
              style={styles.input}
              value={lastname}
              onChangeText= {setLName}
              autoCapitalize="none"
              placeholder = "Last Name"
              keyboardType="default"
              />
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                keyboardType="default"
                placeholder = "Username"


              />
              <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder = "Email"
              />
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder = "Password"

              />
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder = "Phone Number"
                keyboardType="phone-pad"

              />
              {
                loading ? (
                  <ActivityIndicator size={'small'} style ={{ margin: 100}} />
                ) : (
                  <>
                    <TouchableOpacity style={styles.lightButton} onPress={signUp} >
                      <Text style={styles.text}>Sign Up </Text>
                    </TouchableOpacity>
                    <Text style = {{marginBottom: 90}}> </Text>
                      <Link 
                        style={{fontSize: 20, alignSelf: 'center', marginBottom: 85, padding: 20, color: Colors.light.tabIconDefault}} 
                        href="/">Already have an existing account? Sign In ⇨ 
                      </Link>
                  </>
                )}


          </KeyboardAvoidingView>
      </View>
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

