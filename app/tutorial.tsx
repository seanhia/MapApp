/*
Tutorial Page  
Route: Login or Home 
When users open the app for the first time, they will see an engaging, 
swipeable tutorial that introduces Explore App’s key functionalities. 
Returning users can skip the tutorial and jump straight to the main interface. 
*/

import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { Image, StyleSheet, View, Text, FlatList } from 'react-native';

import slides from '../components/TutorialSlides' // page info for each onboarding swipe 

const Tutorial = ({ onComplete }: { onComplete: () => void }) => {
  const pages = slides.map((slide) => ({
    backgroundColor: '#fff', // Customize for each slide if needed
    image: <Image source={slide.image} style={styles.image} />,
    title: slide.title,
    subtitle: slide.subtitle,
  }));

  return (
    <Onboarding
      pages={pages}
      onSkip={onComplete}
      onDone={onComplete}
    />
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
});

export default Tutorial;
