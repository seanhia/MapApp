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
import { useTheme } from '@/hooks/useTheme';


const Tutorial = ({ onComplete }: { onComplete: () => void }) => {
  const { colorScheme, styles } = useTheme();
  const router = useRouter();
  
  
  const pages = slides.map((slide) => ({
    backgroundColor: 'fff', // Customize for each slide if needed
    title: slide.title,
    subtitle: slide.subtitle,
    image: <Image source={slide.image} 
        style={{height: 200, width: 220, marginBottom: 500, justifyContent: 'space-evenly',  marginVertical: 200}}/>,
  }));

  return (
    <View style={styles.fullContainer}>
            <Onboarding 
        
      pages={pages}
      onSkip={() => {
        console.log('Tutorial skipped');
        router.replace('/screens/sign_up')}}
      onDone={() => {
          console.log('Tutorial Completed');
          onComplete();
      }}
      showNext={true} // Ensures Next button is enabled
      showDone={true} // Ensures Done button is displayed
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
