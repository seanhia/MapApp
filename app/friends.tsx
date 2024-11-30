import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Friends = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>This is the Friends Page!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
    },
});

export default Friends;
