import React, { useEffect, useState, useRef, useCallback } from "react";
import { View, SafeAreaView, Text, TextInput, useColorScheme, Alert, ActivityIndicator } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link, router } from "expo-router";
import { Divider } from 'react-native-paper';

import { Loading } from '@/components/Loading'
import SearchBar from "./components/SearchBar";
import UserList from "./components/UserList";
import FriendList from "./components/FriendList";
import PendingList from "./components/PendingList";
import FooterBar from "@/components/FooterBar";

import { User, Friend } from "@/data/types";

import { fetchAllUsers } from "@/data/UserDataService";
import { PendingQuery, FriendQuery, deleteFriendshipAndNotifications, AcceptFriendshipAndDeleteNotification } from "@/data/Friendship";
import { AcceptFriendship, DeleteFriendship } from "@/data/Friendship";
import sharedStyles from "@/constants/sharedStyles";
import { ScrollView, GestureHandlerRootView } from "react-native-gesture-handler";
import graph_json from "@/constants/boilerplate_graph.json"

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
  const [isLoading, setIsLoading] = useState(true)
  const [friendsList, setFriendsList] = useState<Friend[]>([]);
  const [pendingRequests, setPendingRequests] = useState<Friend[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [friendRec, setFriendRec] = useState([]);
  const [user, setUser] = useState<any>();



  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          setUser(user);
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

          setIsLoading(false);

          // Fetch friend recommendations
          // const recommendations = await fetchFriendshipRecommendation();

        } catch (error) {
          console.error("Error fetching friends or users:", error);
        }
      } else {
        console.error("No user is logged in!");
      }
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []); // Empty dependency


  const handleAccept = async (friendship: Friend) => {
    console.log("Accepted friend request from friendshipId:", friendship.id);
    try {
      await AcceptFriendshipAndDeleteNotification(friendship.id); // Update friendship status in Firestore

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
      await deleteFriendshipAndNotifications(friendship.id);
      console.log("Denied friend request from friendshipId:", friendship.id);
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

  const handleFriendViewProfile = async (friend: Friend) => {
    console.log(
      "Attempting to view the following users profile",
      friend.friendId
    );
    router.push({
      pathname: "/screens/profile_view",
      params: { userId: friend.friendId },
    });
  };

  const handleViewProfile = async (user: User) => {
    console.log(
      "Attempting to view the following users profile",
      user.id
    );
    router.push({
      pathname: "/screens/profile_view",
      params: { userId: user.id },
    });
  };

  const handleRecommend = async (graph: any) => {
    console.log(
      "Recommended friend for the user: ",
      user.email);
    router.push({
      pathname: "/screens/friend_rec",
      // params: { graph: JSON.stringify(graph) },
    });
  }


  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilteredUsers(
      allUsers.filter((user) =>
        user?.username?.toLowerCase().includes(query.toLowerCase())
      )
    );
  };


  return (
    isLoading ? (
      <Loading />) : (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.fullContainer}>
          <SearchBar
            value={searchQuery}
            onChange={handleSearch}
          />
          <UserList users={filteredUsers} visible={!!searchQuery} onViewProfile={handleViewProfile} />

          {friendsList.length === 0 && pendingRequests.length === 0 ? (
            <View style={styles.fullContainer}>
              <Text style={[styles.text, { alignSelf: 'center' }]}>No Friends Found</Text>
            </View>

          ) : (

            <>
              <FriendList
                friends={friendsList}
                current_user={user}
                graph={graph_json}
                onViewProfile={handleFriendViewProfile}
                onUnfriend={handleDeny}
                onRecommend={handleRecommend}
              />


              {pendingRequests.length > 0 ? (
                <>
                  <Divider />
                  <Text
                    style={styles.header}>
                    Pending Requests
                  </Text>
                  <PendingList
                    pending={pendingRequests}
                    onAccept={handleAccept}
                    onDeny={handleDeny}
                  />
                </>
              ) : (
                <Text></Text>
              )}
            </>
          )}
          <View>
            <FooterBar />
          </View>
        </View>
      </GestureHandlerRootView>
    )
  )
};

export default Friends;

