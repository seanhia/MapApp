import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import db from '@/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import SearchBar from './components/SearchBar';
import UserList from './components/UserList';
import FriendList from './components/FriendList';
import PendingList from './components/PendingList';

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
          const pendingQ1 = query(friendshipsRef, where('status', '==', 'pending'), where('user1', '==', user.uid));
          const pendingQ2 = query(friendshipsRef, where('status', '==', 'pending'), where('user2', '==', user.uid));
          const [pendingSnapshot1, pendingSnapshot2] = await Promise.all([getDocs(pendingQ1), getDocs(pendingQ2)]);
          const pending: { id: string; friendId: string, friendUsername: string}[] = [];
          pendingSnapshot1.forEach((doc) => pending.push({ id: doc.id, friendId: doc.data().user2, friendUsername: doc.data().username2 }));
          pendingSnapshot2.forEach((doc) => pending.push({ id: doc.id, friendId: doc.data().user1, friendUsername: doc.data().username1 }));
          setPendingRequests(pending);
          console.log('Pending:', pending);

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

  return (
    <View style={styles.container}>
      <SearchBar value={searchQuery} onChange={handleSearch} />
      <UserList users={filteredUsers} visible={!!searchQuery} />
      <FriendList friends={friendsList} />
      <PendingList pending={pendingRequests} />
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
