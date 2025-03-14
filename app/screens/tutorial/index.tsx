/*
Tutorial Page  
Route: Following login (one-time) and settings  
When users open the app for the first time, they will see an engaging, 
swipeable tutorial that introduces Explore App’s key functionalities. 
Returning users can skip the tutorial and jump straight to the main interface. 
*/

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import TutorialScreen from './components/tutorial';
import { useTheme } from '@/hooks/useTheme';


const Tutorial = () => {
  const { styles } = useTheme();
  
  return (
    <View style={styles.fullContainer}>
        <TutorialScreen 
            title="Welcome to EXPLORE!" 
            description="Track your travels and explore new destinations effortlessly." 
            nextPage="/screens/tutorial/tutorial_2"
            image={require('@/assets/images/cloud.png')}
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
