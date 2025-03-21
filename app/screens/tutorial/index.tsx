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
            description="Track your travels and explore new destinations effortlessly with a personalized map. See your travel history uncloud as you explore new locations." 
            nextPage="/screens/tutorial/tutorial_2"
            skip={true}
            image={require('@/assets/images/personal_map.png')}
        />
    </View> 
  );
};


export default Tutorial;
