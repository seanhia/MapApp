import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import db  from '../firestore'; 
import { getAuth, onAuthStateChanged } from "firebase/auth";


const Friends = () => {

    const [friendsList, setFriendsList] = useState<{ id: string; friendId: string }[]>([]);
    const [allUsers, setAllUsers] = useState<{ id: string; username: string }[]>([]); // State for all users
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [filteredUsers, setFilteredUsers] = useState<{ id: string; username: string }[]>([]); // Filtered user results

    useEffect(() => {

        const auth = getAuth(); //initialize auth
        
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
    
              // Build a list of friends (with IDs) from query results
              const friends: { id: string; friendId: string }[] = [];

              // Collect all friend UIDs
              querySnapshot1.forEach((doc) => {
                const data = doc.data();
                friends.push({ id: doc.id, friendId: data.user2 });
              });

              querySnapshot2.forEach((doc) => {
                const data = doc.data();
                friends.push({ id: doc.id, friendId: data.user1 });
              });
    
              console.log('Final Friends List:', friends);
              setFriendsList(friends); // Update state with the final friends list

              // Fetch all users from the 'users' collection
              const usersRef = collection(db, 'users');
              const usersSnapshot = await getDocs(usersRef);
              const users: { id: string; username: string }[] = [];
              usersSnapshot.forEach((doc) => {
                const data = doc.data();
                if (data.username) {
                  users.push({ id: doc.id, username: data.username });
                }
              });
              setAllUsers(users);
              setFilteredUsers(users);
            } catch (error) {
              console.error('Error fetching friends or users:', error); // Log errors during query
            }
          } else {
            console.error('No user is logged in!'); // Handle case where no user is logged in
          }
        });


        return () => unsubscribe(); // Cleanup subscription
      }, []);
      // Filter friends based on search query
      const handleSearch = (query: string) => {
        setSearchQuery(query);
        const filtered = allUsers.filter(user => 
        user.username.toLowerCase().includes(query.toLowerCase())
      );
    setFilteredUsers(filtered);
  };

    return (
        <View style={styles.container}>
          

          {/* Search Bar */}
          <TextInput
            style={styles.searchBar}
            placeholder="Search users..."
            value={searchQuery}
            onChangeText={handleSearch}
          />

          {/* Dropdown for Filtered Users */}
          {searchQuery ? (
            <FlatList
              data={filteredUsers}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.userItem}>
                  <Text style={styles.userText}>{item.username}</Text>
                </TouchableOpacity>
              )}
            />
          ) : null}

          <Text style={styles.title}>Your Friends</Text>
          
          {/* Static Friends List */}
          <Text style={styles.subTitle}></Text>
          <FlatList
            data={friendsList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.friendItem}>
                <Text style={styles.friendText}>Friend ID: {item.friendId}</Text>
              </View>
            )}
          />
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
        marginBottom: 10,
      },
      subTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 0,
        marginBottom: 0,
        textAlign: 'center',
      },
      searchBar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
      },
      userItem: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        marginBottom: 5,
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
      userText: {
        fontSize: 14,
      },

});

export default Friends;
function setFilteredUsers(users: { id: string; username: string; }[]) {
  throw new Error('Function not implemented.');
}

