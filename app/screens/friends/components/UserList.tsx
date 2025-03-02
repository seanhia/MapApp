import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { createFriendship } from '@/data/Friendship';
import { User } from '@/data/types';
import sharedStyles from '@/constants/sharedStyles';

interface UserListProps {
  users: User[];
  visible: boolean;
}

const UserList: React.FC<UserListProps> = ({ users, visible }) => {
  const { colorScheme, styles } = useTheme();
  if (!visible) return null;

  return (
    <View style={[styles.userListContainer]}>
      
    <FlatList
      data={users}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
        style={styles.lightButton}
        onPress={() => createFriendship(item)} // Use dynamic user ID and username
      >
        <Text style={{fontWeight: 'bold', color: 'lightblue'}}>Add Friend</Text>
        <Text style={{fontSize:12, color: 'white'}}>{item.username}</Text> {/* Display the username */}
      </TouchableOpacity>
      
      )}
    />
    </View>
  );
};

export default UserList;
