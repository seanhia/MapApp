import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { createFriendship } from '@/data/Friendship';
import { User } from '@/data/types';

interface UserListProps {
  users: User[];
  visible: boolean;
}

const UserList: React.FC<UserListProps> = ({ users, visible }) => {
  const { colorScheme, styles } = useTheme();
  if (!visible) return null;

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
        style={styles.lightButton}
        onPress={() => createFriendship(item.id, item.username)} // Use dynamic user ID and username
      >
        <Text style={{fontWeight: 'bold'}}>Add Friend</Text>
        <Text style={{fontSize:12}}>{item.username}</Text> {/* Display the username */}
      </TouchableOpacity>
      
      )}
    />
  );
};

export default UserList;
