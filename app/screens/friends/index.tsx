import React, { useEffect, useState } from 'react';
import { View, Text, useColorScheme} from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import SearchBar from './components/SearchBar';
import UserList from './components/UserList';
import FriendList from './components/FriendList';
import PendingList from './components/PendingList';

import { User } from '@/data/types';
import { Friend } from '@/data/types';

import { fetchAllUsers } from '@/data/UserDataService';
import { PendingQuery, FriendQuery } from '@/data/FriendshipQuery';
import { AcceptFriendship, DenyFriendship } from '@/data/Friendship';

import sharedStyles from '@/constants/sharedStyles';
import FooterBar from '@/components/FooterBar';


const Friends = () => {
  const colorScheme = useColorScheme(); 
  const styles = sharedStyles(colorScheme);

  const [friendsList, setFriendsList] = useState<Friend[]>([]);
  const [pendingRequests, setPendingRequests] = useState<Friend[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');


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

  const handleAccept = async (friendship: Friend) => {
    console.log('Accepted friend request from friendshipId:', friendship.id);
    try {
      await AcceptFriendship(friendship.id); // Update friendship status in Firestore
      
      // Update state to remove the accepted request from the UI    
      setFriendsList([...friendsList, friendship])
      setPendingRequests(oldRequest => {
        return oldRequest.filter(pendingRequests => pendingRequests != friendship)
      })

    } catch (error) {
    console.error('Error handling friend acceptance:', error);
    }
};

const handleDeny = async (friendship: Friend) => {
    console.log('Denied friend request from friendshipId:', friendship.id);
    try {
      // Handle deny logic (e.g., remove the friendship request or change the status)
        await DenyFriendship(friendship.id); 
        // Update state
        setFriendsList(oldRequest => {
          return oldRequest.filter(friendsList => friendsList != friendship)
        })
        setPendingRequests(oldRequest => {
          return oldRequest.filter(pendingRequests => pendingRequests != friendship)
        })
    } catch (error) {
      console.error('Error handling friend denial:', error);
    }
  };

  const handleProfile = async (friendship: Friend) => {
    console.log('Attempting to view the following users profile', friendship.friend_id) 
  }


  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilteredUsers(allUsers.filter((user) => user.username.toLowerCase().includes(query.toLowerCase())));
  };    
   
  return (
    <View style={styles.fullContainer}>
      <SearchBar value={searchQuery} onChange={handleSearch} />
      <UserList users={filteredUsers} visible={!!searchQuery} />
      <Text style={styles.header}>Friends:</Text>
      <FriendList 
        friends={friendsList} 
        onViewProfile={handleProfile} // Placeholder 
        onUnfriend={handleDeny} // Delete Friendship 
        />
      <Text style={styles.header}>Pending Requests:</Text>
      <PendingList 
        pending={pendingRequests}
        onAccept={handleAccept}
        onDeny={handleDeny} 
        />
      <View>
        <FooterBar/>
      </View>
    </View>
  
  );
};


export default Friends;
