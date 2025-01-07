import sharedStyles from '@/constants/sharedStyles';
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProfileStatistics = () => {
    return (
        <View style={sharedStyles.fullContainer}>
            <Text style={sharedStyles.header}>Statistics</Text>
            <View style={sharedStyles.profileContainer}>
                <Image style={styles.statsImage} source={require('@/assets/images/distance.jpg')} />
                <Image style={styles.statsImage} source={require('@/assets/images/city.jpg')} />
                <Image style={styles.statsImage} source={require('@/assets/images/globe.jpg')} />
            </View>
            <View style={sharedStyles.profileContainer}>
                <Text>Distance Traveled</Text>
                <Text>Cities Visited</Text>
                <Text>Countries Visited</Text>

            </View>
            <View style={sharedStyles.profileContainer}>
                <Text>2462 m</Text>
                <Text>3</Text>
                <Text>1</Text>
            </View>

        </View>

    );
};

export default ProfileStatistics;

const styles = StyleSheet.create({
    statsImage: {
        height: 100, width: 100
    },
    
})

