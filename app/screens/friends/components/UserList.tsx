import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import sharedStyles from '@/constants/sharedStyles';
import createFriendship from '@/assets/data/CreateFriendship';

interface User {
  id: string;
  username: string;
}

interface UserListProps {
  users: User[];
  visible: boolean;
}

const UserList: React.FC<UserListProps> = ({ users, visible }) => {
  if (!visible) return null;

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
        style={sharedStyles.button}
        onPress={() => createFriendship(item.id, item.username)} // Use dynamic user ID and username
      >
        <Text style={{ color: 'black', fontWeight: 'bold' }}>Add Friend</Text>
        <Text>{item.username}</Text> {/* Display the username */}
      </TouchableOpacity>
      
      )}
    />
  );
};

export default UserList;
