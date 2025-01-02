import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import db from '@/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import SearchBar from './components/SearchBar';
import UserList from './components/UserList';
import FriendList from './components/FriendList';
import PendingList from './components/PendingList';
import PendingQuery from '@/assets/data/PendingQuery';
import AcceptFriendship from '@/assets/data/AcceptFriendship';
import sharedStyles from '@/constants/sharedStyles';
import FooterBar from '@/components/FooterBar';

const Friends = () => {
  const [friendsList, setFriendsList] = useState<{ id: string; friendId: string, friendUsername: string }[]>([]);
  const [allUsers, setAllUsers] = useState<{ id: string; username: string }[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<{ id: string; username: string }[]>([]);
  const [pendingRequests, setPendingRequests] = useState<{ id: string; friendId: string, friendUsername: string }[]>([]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const friendshipsRef = collection(db, 'friendships'); // collection of friendship documents 
          
          // Output all friendship documents in the Console
          console.log('Fetching friends for user:', user.uid);
          const FetchDocs = await getDocs(friendshipsRef);
          console.log('Friends Collection', FetchDocs.docs)
          FetchDocs.docs.forEach(doc => { console.log(doc.id, '=>', doc.data()) });
          
          // Query for approved friendships for the current user 
          const approvedQ1 = query(friendshipsRef, where('status', '==', 'approved'), where('user1', '==', user.uid));
          const approvedQ2 = query(friendshipsRef, where('status', '==', 'approved'), where('user2', '==', user.uid));
          const [querySnapshot1, querySnapshot2] = await Promise.all([getDocs(approvedQ1), getDocs(approvedQ2)]);
          const friends: { id: string; friendId: string, friendUsername: string}[] = [];
          querySnapshot1.forEach((doc) => friends.push({ id: doc.id, friendId: doc.data().user2, friendUsername: doc.data().username2 }));
          querySnapshot2.forEach((doc) => friends.push({ id: doc.id, friendId: doc.data().user1, friendUsername: doc.data().username1 }));
          setFriendsList(friends);
          console.log('Friends:', friends);

          // Query for pending friendships for the current user
          const pending = await PendingQuery();
          setPendingRequests(pending);

          // Fetch all users from the database for the search functionality
          const usersRef = collection(db, 'users');
          const usersSnapshot = await getDocs(usersRef);
          const users: { id: string; username: string }[] = [];
          usersSnapshot.forEach((doc) => users.push({ id: doc.id, username: doc.data().username }));
          setAllUsers(users);
          setFilteredUsers(users);
        } catch (error) {
          console.error('Error fetching friends or users:', error);
        }
      } else {
        console.error('No user is logged in!');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilteredUsers(allUsers.filter((user) => user.username.toLowerCase().includes(query.toLowerCase())));
  };

  const handleAccept = async (friendshipId: string) => {
      console.log('Accepted friend request from friendshipId:', friendshipId);
      try {
        await AcceptFriendship(friendshipId); // Update friendship status in Firestore
        // Optionally, refresh the pending requests after accepting
        // Update state to remove the accepted request from the UI
      } catch (error) {
        console.error('Error handling friend acceptance:', error);
      }
    };
    
    const handleDeny = async (friendshipId: string) => {
      console.log('Denied friend request from friendshipId:', friendshipId);
      try {
        // Handle deny logic (e.g., remove the friendship request or change the status)
      } catch (error) {
        console.error('Error handling friend denial:', error);
      }
    };

  return (
    <View style={styles.container}>
      <SearchBar value={searchQuery} onChange={handleSearch} />
      <UserList users={filteredUsers} visible={!!searchQuery} />
      <Text style={sharedStyles.header}>Friends:</Text>
      <FriendList friends={friendsList} />
      <Text style={sharedStyles.header}>Pending Requests:</Text>
      <PendingList 
        pending={pendingRequests}
        onAccept={handleAccept}
        onDeny={handleDeny} />
      <FooterBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
});

export default Friends;
