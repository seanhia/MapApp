/*
Tutorial Page  
Route: Following login (one-time) and settings  
When users open the app for the first time, they will see an engaging, 
swipeable tutorial that introduces Explore App’s key functionalities. 
Returning users can skip the tutorial and jump straight to the main interface. 
*/

import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { Image, StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import slides from './TutorialSlides' // page info for each onboarding swipe 

const Tutorial = ({ onComplete }: { onComplete: () => void }) => {
    const router = useRouter();
  
  const pages = slides.map((slide) => ({
    backgroundColor: '#fff', // Customize for each slide if needed
    image: <Image source={slide.image} style={styles.image} />,
    title: slide.title,
    subtitle: slide.subtitle,
  }));

  return (
    <View>
            <TouchableOpacity style={styles.button} onPress={() => router.push('./app-example/(tabs)/_layout.tsx')}>
              <Text style={styles.buttonText}>Leaderboard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/screens/friends')}>
              <Text style={styles.buttonText}>Friends</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/screens/user_profile')}>
              <Text style={styles.buttonText}>Profile</Text>
            </TouchableOpacity>
            <Onboarding
      pages={pages}
      onSkip={onComplete}
      onDone={onComplete}
      
    />
          </View>

    
    
  );
};

const styles = StyleSheet.create({
  image: {
    paddingTop: 700,
    width: 600,
    height: 500,
    resizeMode: 'center',
    position: 'absolute'
  },
  button: {
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default Tutorial;
