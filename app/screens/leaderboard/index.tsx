import React, { useEffect, useState} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import FooterBar from '@/components/FooterBar';
import { useTheme } from '@/hooks/useTheme';
import { rankUsers, getTopFourUsers, fetchCurrentUserLeaderboard, getFriendsRank } from '@/data/UserDataService';
import { Leaderboard } from '@/data/types';
import UserSettings from '../settings';

const LeaderboardScreen =  () => {
    
    const {colorScheme, styles } = useTheme();
    const [info, setData] = useState<Leaderboard[] | null>(null);
    const [otherInfo, setData2] = useState<Leaderboard | null>(null);
    const [friendinfo, setFriend] = useState<Leaderboard[] | null>(null);
    const [tempData, setTemp] = useState<Leaderboard[] | null>(null);
    var isFriendsList = false;

    const switchData = async () => {
        if(!isFriendsList){
            setTemp(info)
            setData(friendinfo)
            setFriend(info)
            isFriendsList = true;
        }else{
            setTemp(info)
            setData(friendinfo)
            setFriend(info)
            isFriendsList = false;
        }
    }
    
    useEffect(() => {
        const fetchData = async () => {
            const topUsers = await getTopFourUsers();
            
            setData(topUsers);
            
            const curUserRank = await fetchCurrentUserLeaderboard();
            setData2(curUserRank);
        };

        const fetchFriendsData = async () => {
            const friends = await getFriendsRank()
            console.log(friends)
            setFriend(friends)
        }


        fetchData();
        fetchFriendsData();
    }, []);
    


    return (
//         <View style={style.container}>
//             <Text style={style.text}>Leaderboard</Text>
//             <View style={style.box}>
//                 <FlatList
//                     data= {info}
//                     keyExtractor={(item) => item.id}
//                     renderItem={({ item }) => (
//                         <View style={style.row}>
//                             <Text style={style.username}>{item.ranking +". " + item.username}</Text>
//                             <Text style={style.score}>{item.points}</Text>
//                         </View>
//                     )}
//                 />
            
            

//             </View>
//             <View style={style.box}>
//                 <View style={style.row}>
//                   <Text style={style.username}>{otherInfo?.ranking}. {otherInfo?.username}</Text>
//                   <Text style={style.score}>{otherInfo?.points}</Text>
//                 </View>
//             </View>
//             <FooterBar />
//             <TouchableOpacity style={styles.lightButton} onPress={rankUsers}>
//                         <Text style={styles.buttonText}>
//                             Update Rank
//                         </Text>
//             </TouchableOpacity>
//         </View>
        
//     );
// };

// const style = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#f0f0f0', 
//         marginTop: 200,
//     },
//     box: {
//         width: '80%', 
//         padding: 20,
//         backgroundColor: '#fff',
//         borderRadius: 10,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 4,
//     },
//     row: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         paddingVertical: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ddd',
//     },
//     text: {
//         fontSize: 30,
//         position: 'absolute',
//         top: 20,
//         right: 20,
//         fontWeight: 'bold'
//     },
//     username: {
//         fontSize: 28,
//         fontWeight: 'bold',
//         marginLeft: 50
//     },
//     score: {
//         fontSize: 22,
//         color: '#555',
//         marginRight: 50,

//     },
//     title: {
//         fontSize: 30,
//         position: 'absolute',
        
//         fontWeight: 'bold'
//     }
// });
<View style={style.container}>
    <Text style={style.text}>Leaderboard</Text>
    
    <View style={style.box}>
        <FlatList
            data={info}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={style.row}>
                    <Text style={style.username}>{item.ranking + ". " + item.username}</Text>
                    <Text style={style.score}>{item.points}</Text>
                </View>
            )}
        />
    </View>

    <View style={style.box}>
        <View style={style.row}>
            <Text style={style.username}>{otherInfo?.ranking}. {otherInfo?.username}</Text>
            <Text style={style.score}>{otherInfo?.points}</Text>
        </View>
    </View>
    
    <FooterBar />

    <View style={style.buttonContainer}>
        <TouchableOpacity style={style.lightButton} onPress={rankUsers}>
            <Text style={style.buttonText}>Update Rank</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[style.lightButton, style.friendsButton]} onPress={switchData}>
            <Text style={style.buttonText}>Friends</Text>
        </TouchableOpacity>
    </View>
</View>
    )
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        paddingTop: 50, // Adjusted for a more mobile-friendly top spacing
    },
    box: {
        width: '90%', // Made it responsive to screen size
        marginBottom: 5,
        padding: 10, // Reduced padding for a tighter fit
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3, // For Android shadow effect
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    text: {
        fontSize: 28, // Smaller size for mobile screens
        fontWeight: 'bold',
        color: '#333',
        marginTop: 20,
    },
    username: {
        fontSize: 20, // Adjusted for mobile readability
        fontWeight: 'bold',
        color: '#333',
    },
    score: {
        fontSize: 18, // Adjusted for mobile readability
        color: '#555',
    },
    title: {
        fontSize: 24, 
        fontWeight: 'bold',
        color: '#333',
    },
    lightButton: {
        backgroundColor: '#007BFF', // Button color
        paddingVertical: 15, // Make the button taller for easier tap
        paddingHorizontal: 30,
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 40, // To make space at the bottom
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row', // Aligns buttons horizontally
        justifyContent: 'space-between', // Ensures there's space between buttons
        width: '90%', // Ensures buttons take up the available width
        marginTop: 10,
        marginBottom: 40,
    },
    // Specific style for "Friends" button (optional)
    friendsButton: {
        backgroundColor: '#28a745', // Different color for the "Friends" button
    }
});



export default LeaderboardScreen;
