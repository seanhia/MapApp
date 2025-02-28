import React, { useEffect, useState} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import FooterBar from '@/components/FooterBar';
import { useTheme } from '@/hooks/useTheme';
import { rankUsers, getTopFourUsers, fetchUserByUID } from '@/data/UserDataService';
import { Leaderboard } from '@/data/types';

const LeaderboardScreen =  () => {
    const {colorScheme, styles } = useTheme();
    const [info, setData] = useState<Leaderboard[] | null>(null);
    const [nameUse, setName] = useState([])
    // const data = [
    //     { id: '1', username: 'user1', points: 150 },
    //     { id: '2', username: 'user2', points: 120 },
    //     { id: '3', username: 'user3', points: 100 },
    //     { id: '4', username: 'user4', points: 90 },
    // ];
    useEffect(() => {
        const fetchData = async () => {
            const topUsers = await getTopFourUsers();
            
            setData(topUsers);
        };


        fetchData();
    }, []);
    


    return (
        <View style={style.container}>
            <Text style={style.text}>Leaderboard</Text>
            <View style={style.box}>
                <FlatList
                    data= {info}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={style.row}>
                            <Text style={style.username}>{item.username}</Text>
                            <Text style={style.score}>{item.points}</Text>
                        </View>
                    )}
                />

            </View>
            <FooterBar />
            <TouchableOpacity style={styles.lightButton} onPress={rankUsers}>
                        <Text style={styles.buttonText}>
                            Update Rank
                        </Text>
            </TouchableOpacity>
        </View>
        
    );
};

const style = StyleSheet.create({
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

export default LeaderboardScreen;
