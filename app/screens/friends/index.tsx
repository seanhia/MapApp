import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import SearchBar from './components/SearchBar';
import UserList from './components/UserList';
import FriendList from './components/FriendList';
import PendingList from './components/PendingList';

import { User } from '@/data/types';

import { fetchAllUsers } from '@/data/UserDataService';
import { PendingQuery, FriendQuery } from '@/data/FriendshipQuery';
import { handleAccept, handleDeny } from '@/data/Friendship';

import sharedStyles from '@/constants/sharedStyles';
import FooterBar from '@/components/FooterBar';

const Friends = () => {
  const [friendsList, setFriendsList] = useState<{ id: string; friendId: string, friendUsername: string }[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [pendingRequests, setPendingRequests] = useState<{ id: string; friendId: string, friendUsername: string }[]>([]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Query for approved friendships for the current user 
          const friends = await FriendQuery();
          setFriendsList(friends); 

          // Query for pending friendships for the current user
          const pending = await PendingQuery();
          setPendingRequests(pending);

         // Fetch all users from the database for the search functionality
          const users = await fetchAllUsers();
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
    <View style={sharedStyles.fullContainer}>

      <SearchBar value={searchQuery} onChange={handleSearch} />
      <UserList users={filteredUsers} visible={!!searchQuery} />

      <Text style={sharedStyles.header}>Friends:</Text>
      <FriendList 
        friends={friendsList} 
        onViewProfile={handleAccept}
        onUnfriend={handleDeny} />

      <Text style={sharedStyles.header}>Pending Requests:</Text>
      <PendingList 
        pending={pendingRequests}
        onAccept={handleAccept}
        onDeny={handleDeny} />

      <View>
        <FooterBar/>
      </View>
      

    </View>
  
  );
};


export default Friends;
