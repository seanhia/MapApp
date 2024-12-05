/*
Tutorial Page  
Route: Login or Home 
When users open the app for the first time, they will see an engaging, 
swipeable tutorial that introduces Explore App’s key functionalities. 
Returning users can skip the tutorial and jump straight to the main interface. 
*/

import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { Image, StyleSheet, View, Text } from 'react-native';

// Define the props type
type TutorialProps = {
  setShowTutorial: (show: boolean) => void;
};

const Tutorial: React.FC<TutorialProps> = ({ setShowTutorial }) => {
  return (
    <Onboarding
      pages={[
        {
          backgroundColor: '#3e3e3e',
          image: <Image style={styles.image} source={require('../assets/images/cloud.png')} />,
          title: 'Welcome to Explore App',
          subtitle: 'Track your travels and explore new destinations effortlessly.',
        },
        {
          backgroundColor: '#a6e4d0',
          image: <Image style={styles.image} source={require('../assets/images/location.png')} />,
          title: 'View Your Travel Map',
          subtitle: 'See your travel history plotted on a personalized map.',
        },
        {
          backgroundColor: '#fdd835',
          image: <Image style={styles.image} source={require('../assets/images/icon.png')} />,
          title: 'Log Your Journeys',
          subtitle: 'Easily add and categorize your trips.',
        },
        {
          backgroundColor: '#ff6f61',
          image: <Image style={styles.image} source={require('../assets/images/icon.png')} />,
          title: 'Share Your Adventures',
          subtitle: 'Show your travel achievements with friends!',
        },
      ]}
      onSkip={() => setShowTutorial(false)} // Skip to the main app
      onDone={() => setShowTutorial(false)} // Complete tutorial
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default Tutorial;
