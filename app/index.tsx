import app, {auth} from "../firebase";

import { useState} from "react";
import { Text, View, StyleSheet, KeyboardAvoidingView, Button, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Link , router} from 'expo-router';
import { FirebaseError } from 'firebase/app'
import {signUpWithEmail, signInWithEmail} from "../auth";
import { useTheme } from '@/hooks/useTheme'; 
import { Colors } from '../constants/Colors';
import { ImageHeader } from '@/components/ImageHeader'


export default function Index() {
  const { colorScheme, styles } = useTheme();
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
    <View style={{backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background, flex: 1}}>
      <View
        style={styles.centerContainer}
      >
        <Link style={{alignSelf: 'center'}} href="/screens/home">
          <Text style={{ color: Colors.light.tabIconDefault}}>Homepage (Temporary)</Text>
        </Link>

        <ImageHeader 
          image={require('@/assets/images/cloud.png')}
          text='EXPLORE'
        />
        <KeyboardAvoidingView behavior="padding" >
            <TextInput
              style={styles.placeHolderInput}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder = "Email"
              />
              <TextInput
                style={styles.placeHolderInput}
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
                    <Link style={styles.rightLink} href="/screens/forgot_password">Forgot Password?</Link>
                    <TouchableOpacity style={styles.lightButton} onPress={signIn}> 
                      <Text style={styles.text}>Sign In</Text> 
                      </TouchableOpacity>
                    <>
                      <Text style = {{marginBottom: 80}}>
                
                      </Text>
                      <Link style={{fontSize: 20, alignSelf: 'center', marginBottom: 85, color: Colors.light.tabIconDefault}} href="/screens/sign_up">Don't have an account? Sign Up ⇨ </Link>
                      <View style={styles.lowerContainer}>
                        <Image style={styles.profilePicture} source={require('../assets/images/cloud.png')} />
                        <Link style={styles.tutorial} href="/screens/tutorial">Tutorial?</Link>
                      </View>
                    </>
                  </>
                )}
          </KeyboardAvoidingView>
          
      </View>
    </View>
    
  );
}



