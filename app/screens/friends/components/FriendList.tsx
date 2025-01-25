import React from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import sharedStyles from '@/constants/sharedStyles';
import { Friend } from "@/data/types"


interface FriendListProps {
  friends: Friend[];
  onViewProfile: (id: Friend) => void;
  onUnfriend: (id: Friend) => void;
}

const FriendList: React.FC<FriendListProps> = ({ friends, onViewProfile, onUnfriend }) => {
  return (
    <FlatList
      data={friends}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={sharedStyles.buttonContainer}>
          <Image source={require('@/assets/images/cloud.png')} 
            style={sharedStyles.profilePicture} />
          <Text style={sharedStyles.boldText}>@{item.friend_username}</Text>
            <TouchableOpacity 
              style={sharedStyles.sideButton}
              onPress={() => onViewProfile(item)}
              >
                <Text style={sharedStyles.tinyText}>View Profile</Text>
              </TouchableOpacity>
            <TouchableOpacity 
              style={sharedStyles.sideButton}
              onPress={() => onUnfriend(item)}
              >
                <Text style={sharedStyles.tinyText}>Unfriend</Text>
              </TouchableOpacity>
        </View>
      )}
    />
  );
};

export default FriendList;
