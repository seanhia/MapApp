import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const Leaderboard = () => {
    const data = [
        { id: '1', username: 'user1', score: 150 },
        { id: '2', username: 'user2', score: 120 },
        { id: '3', username: 'user3', score: 100 },
        { id: '4', username: 'user4', score: 90 },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Leaderboard</Text>
            <View style={styles.box}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.row}>
                            <Text style={styles.username}>{item.username}</Text>
                            <Text style={styles.score}>{item.score}</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0', 
    },
    box: {
        width: '80%', 
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    text: {
        fontSize: 30,
        position: 'absolute',
        top: 20,
        right: 20,
        fontWeight: 'bold'
    },
    username: {
        fontSize: 28,
        fontWeight: 'bold',
        marginLeft: 50
    },
    score: {
        fontSize: 22,
        color: '#555',
        marginRight: 50,

    },
});

export default Leaderboard;
