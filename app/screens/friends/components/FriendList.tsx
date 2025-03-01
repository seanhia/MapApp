import React from 'react';
import { useColorScheme, FlatList, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Friend, User} from "@/data/types"
import { useProfileImage } from '@/hooks/useProfileImage';
import { fetchCurrentUser, fetchUserByUID } from '@/data/UserDataService';
import { useState, useEffect } from 'react';


interface FriendListProps {
  friends: Friend[];
  onViewProfile: (id: Friend) => void;
  onUnfriend: (id: Friend) => void;
}

const FriendList: React.FC<FriendListProps> = ({ friends, onViewProfile, onUnfriend }) => {
  const { colorScheme, styles } = useTheme();
  
  return (
    <FlatList
      data={friends}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ScrollView contentContainerStyle={styles.buttonContainer}>
         <Image
              style={styles.profilePicture}
              source={item.friendProfilePhoto ? { uri: item.friendProfilePhoto } : require('@/assets/images/cloud.png')}
            />
          <Text style={styles.boldText}>@{item.friendUsername}</Text>

            <TouchableOpacity 
              style={styles.sideButton}
              onPress={() => onViewProfile(item)}>
              <Text style={styles.buttonText}>View Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.sideButton}
              onPress={() => onUnfriend(item)}>
              <Text style={styles.buttonText}>Unfriend</Text>
            </TouchableOpacity>

        </ScrollView>
      )}
    />
  );
};

export default FriendList;
// function useState<T>(arg0: null): [any, any] {
//   throw new Error('Function not implemented.');
// }

