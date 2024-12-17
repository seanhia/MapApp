import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import db  from '../firestore'; // Import Firestore instance
import { getAuth, onAuthStateChanged } from "firebase/auth";




const Friends = () => {

    const [friendsList, setFriendsList] = useState<{ id: string; friendId: string }[]>([]);

    useEffect(() => {

        const auth = getAuth();

        // Listen for user authentication state changes
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            console.log('User signed in:', user.uid);
          
            try {
              const friendshipsRef = collection(db, 'friendships');
    
              // Queries to find approved friendships involving the current user
              const q1 = query(friendshipsRef, where('status', '==', 'approved'), where('user1', '==', user.uid));
              const q2 = query(friendshipsRef, where('status', '==', 'approved'), where('user2', '==', user.uid));
    
              // Fetch data from both queries
              const [querySnapshot1, querySnapshot2] = await Promise.all([getDocs(q1), getDocs(q2)]);
    
              const friendUids: string[] = [];

              // Collect all friend UIDs
              querySnapshot1.forEach((doc) => {
              const data = doc.data();
              if (data.user2) friendUids.push(data.user2);
              });

              querySnapshot2.forEach((doc) => {
                const data = doc.data();
                if (data.user1) friendUids.push(data.user1);
              });

              console.log('Friend UIDs:', friendUids);
    
              const friends: { id: string; friendId: string }[] = [];
    
              // Process friends where the current user is 'user1'
              querySnapshot1.forEach((doc) => {
                const data = doc.data();
                friends.push({ id: doc.id, friendId: data.user2 });
              });
    
              // Process friends where the current user is 'user2'
              querySnapshot2.forEach((doc) => {
                const data = doc.data();
                friends.push({ id: doc.id, friendId: data.user1 });
              });
    
              console.log('Final Friends List:', friends);
              setFriendsList(friends);
            } catch (error) {
              console.error('Error fetching friends:', error);
            }
          } else {
            console.error('No user is logged in!');
          }
        });
       

        return () => unsubscribe(); // Cleanup subscription
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
