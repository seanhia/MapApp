import React from 'react';
import { useColorScheme, FlatList, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Friend } from "@/data/types"


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
          <Image source={require('@/assets/images/cloud.png')} // Placeholder Profile Picture 
            style={styles.profilePicture} />
          <Text style={styles.boldText}>@{item.friend_username}</Text>

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
