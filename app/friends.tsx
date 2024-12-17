import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import db  from '../firestore'; // Import Firestore instance



const Friends = () => {

    const [friendsList, setFriendsList] = useState<{ id: string; friendId: string }[]>([]);
    const currentUserId = 'currentUserId'; // Replace with logged-in user ID

    useEffect(() => {
        const fetchFriends = async () => {
          try {
            const friendshipsRef = collection(db, 'friendships');

            // Queries for approved friendships involving the current user
            const q1 = query(friendshipsRef, where('status', '==', 'approved'), where('user1', '==', currentUserId));
            const q2 = query(friendshipsRef, where('status', '==', 'approved'), where('user2', '==', currentUserId));

            const [querySnapshot1, querySnapshot2] = await Promise.all([getDocs(q1), getDocs(q2)]);

            const friends: { id: string; friendId: string }[] = [];

            // Process results where the current user is 'user1'
            querySnapshot1.forEach((doc) => {
                const data = doc.data();
                friends.push({ id: doc.id, friendId: data.user2 }); // Friend is user2
            });

            // Process results where the current user is 'user2'
            querySnapshot2.forEach((doc) => {
                const data = doc.data();
                friends.push({ id: doc.id, friendId: data.user1 }); // Friend is user1
            });

            setFriendsList(friends);
            } catch (error) {
              console.error('Error fetching friends:', error);
         }
    };

    fetchFriends();
}, []);  
    
    return (
        <View style={styles.container}>
          <Text style={styles.title}>Your Friends</Text>
    
          {friendsList.length === 0 ? (
            <Text style={styles.noFriends}>No friends found!</Text>
          ) : (
            <FlatList
              data={friendsList}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.friendItem}>
                  <Text style={styles.friendText}>Friend ID: {item.friendId}</Text>
                </View>
              )}
            />
          )}
        </View>
      );
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f8f8',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
      },
      noFriends: {
        fontSize: 16,
        textAlign: 'center',
        color: '#555',
      },
      friendItem: {
        padding: 10,
        backgroundColor: '#e6f7ff',
        borderRadius: 8,
        marginBottom: 10,
      },
      friendText: {
        fontSize: 16,
      },
});

export default Friends;
