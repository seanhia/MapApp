import React, { useEffect, useState, useRef, useCallback} from "react";
import { View, SafeAreaView, Text, TextInput, useColorScheme, Alert } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link, router } from "expo-router";
import { Divider } from 'react-native-paper';

import SearchBar from "./components/SearchBar";
import UserList from "./components/UserList";
import FriendList from "./components/FriendList";
import PendingList from "./components/PendingList";
import FooterBar from "@/components/FooterBar";

import { User, Friend } from "@/data/types";

import { fetchAllUsers } from "@/data/UserDataService";
import { PendingQuery, FriendQuery } from "@/data/Friendship";
import { AcceptFriendship, DeleteFriendship } from "@/data/Friendship";

import sharedStyles from "@/constants/sharedStyles";
import { ScrollView } from "react-native-gesture-handler";

// /**
//  * Friends Screen
//  * --------------------
//  * This component handles the display and management of user friendships,
//  * including approved friends, pending requests, and search functionality.
//  *
//  */

const Friends = () => {
  const colorScheme = useColorScheme();
  const styles = sharedStyles(colorScheme);

  const [friendsList, setFriendsList] = useState<Friend[]>([]);
  const [pendingRequests, setPendingRequests] = useState<Friend[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  // const [isSearchActive, setIsSearchActive] = useState(false);
  // const inputRef = useRef<TextInput>(null);

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
          console.error("Error fetching friends or users:", error);
        }
      } else {
        console.error("No user is logged in!");
      }
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []); // Empty dependency


  // Updating the database and state 
  const handleAccept = async (friendship: Friend) => {
    console.log("Accepted friend request from friendshipId:", friendship.id);
    try {
      await AcceptFriendship(friendship.id); // Update friendship status in Firestore

      // Update state to remove the accepted request from the UI
      setFriendsList([...friendsList, friendship]);
      setPendingRequests((oldRequest) => {
        return oldRequest.filter(
          (pendingRequests) => pendingRequests.id != friendship.id
        );
      });
    } catch (error) {
      console.error("Error handling friend acceptance:", error);
    }
  };

  const handleDeny = async (friendship: Friend) => {
    const confirmDeny = window.confirm(
      "Are you sure you want to deny this friend request?"
    );
    if (confirmDeny) {
      // Handle deny logic (e.g., remove the friendship request or change the status)
      await DeleteFriendship(friendship.id);
      console.log("Denied friend request from friendshipId:", friendship.id);
      // Update state
      setFriendsList((oldRequest) => {
        return oldRequest.filter((friendsList) => friendsList != friendship);
      });
      setPendingRequests((oldRequest) => {
        return oldRequest.filter(
          (pendingRequests) => pendingRequests != friendship
        );
      });
    }
  };

  const handleViewProfile = async (friendship: Friend) => {
    console.log(
      "Attempting to view the following users profile",
      friendship.friendId
    );
    router.push({
      pathname: "/screens/profile_view",
      params: { userId: friendship.friendId }, // Pass friend_id as a parameter
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilteredUsers(
      allUsers.filter((user) =>
        user?.username?.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  // const searchText = useCallback(
  //   (text: string) => {
  //     if (!isSearchActive) {
  //       setIsSearchActive(true);
  //     }
  //     const page = 1;
  //     const limit = 3;
  //     const filtered = allUsers.filter((user) =>
  //       user?.username?.toLowerCase().includes(text.toLowerCase())
  //     );
  //     setFilteredUsers(filtered);
  //     if (inputRef.current) {
  //       inputRef.current.blur();
  //     }
  //   },
  //   [allUsers, isSearchActive],
  // );

  // const onTextClear = useCallback(() => {
  //   if (isSearchActive) {
  //     setIsSearchActive(false);
  //   }
  // }, [isSearchActive]);

  return (
    <View style={styles.fullContainer}>
      <SearchBar
        value={searchQuery} 
        onChange={handleSearch}
        // inputRef={inputRef} 
        />
      <UserList users={filteredUsers} visible={!!searchQuery} />
      <ScrollView>
        <Text style={[styles.header, {marginTop: 90}]}>Friends</Text>
        <FriendList
          friends={friendsList}
          onViewProfile={handleViewProfile} // Placeholder
          onUnfriend={handleDeny} // Delete Friendship
        />
        <Divider/>
        <Text style={styles.header}>Pending Requests</Text>
        
        <PendingList
          pending={pendingRequests}
          onAccept={handleAccept}
          onDeny={handleDeny}
        />
        
      </ScrollView>
      <SafeAreaView>
        <FooterBar />
      </SafeAreaView>
    </View>
  );
};

export default Friends;
