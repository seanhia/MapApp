import app, {auth} from "@/firebase";
import {sendEmailVerification} from 'firebase/auth';
import { useEffect, useState} from "react";
import { Text, View, KeyboardAvoidingView, ActivityIndicator, TouchableOpacity, Image, StyleSheet } from "react-native";
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";
import { Link , router} from 'expo-router';
import { FirebaseError } from 'firebase/app'
import {signUpWithEmail, signInWithEmail} from "@/auth";
import { useTheme } from '@/hooks/useTheme'; 
import { Colors } from '@/constants/Colors';
import { ImageHeader } from '@/components/ImageHeader'
import { Loading } from '@/components/Loading'


export default function Login() {
  const { colorScheme, styles } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  

  const signIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = await signInWithEmail(email, password);
      if (user?.emailVerified) {
        router.push('/screens/home');
      
      } else {
        sendEmailVerification(user);
        router.replace('/screens/email_verifying');
      }
  
    } catch (e: any) {
      const err = e as FirebaseError;
      alert('Sign in failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Redirect if the user is already logged in (auth.currentUser)
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      router.push('/screens/home'); // Automatically redirect logged-in users to home
    }
  }, []);

  return (
    loading ? (
    <Loading/>) :

    <GestureHandlerRootView style={{ flex: 1 }}>
      
    <View style={{backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background, flex: 1}}>

      <View
        style={styles.centerContainer}
      >
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
                (
                  <>
                    <Link style={styles.rightLink} href="/screens/forgot_password">Forgot Password?</Link>
                    <TouchableOpacity style={styles.lightButton} onPress={signIn}> 
                      <Text style={styles.text}>Sign In</Text> 
                      </TouchableOpacity>
                    <>
                      <Text style = {{marginBottom: 80}}>
                
                      </Text>
                      <Link style={{fontSize: 20, alignSelf: 'center', marginBottom: 85, color: Colors.light.tabIconDefault}} href="/screens/sign_up">Don't have an account? Sign Up ⇨ </Link>
                      <View style={style.lowerContainer}>
                        <Image style={styles.profilePicture} source={require('@/assets/images/cloud.png')} />
                        <Link style={styles.tutorial} href="/screens/tutorial">Tutorial?</Link>
                      </View>
                    </>
                  </>
                )}
          </KeyboardAvoidingView>
          
      </View>
    </View>
    </GestureHandlerRootView>
  );
}

const style = StyleSheet.create({
  
  lowerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '80%',
  },
});



