import React from 'react';
import { View, FlatList, Text, TouchableOpacity, Image } from 'react-native';
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

        <View style={styles.listContainer}>
          <View style={styles.leftContainer}>
          <Image
              style={{width: 70, height: 70, margin: 10, borderRadius: 50}}
               source={require('@/assets/images/profile-pic.jpg')}
            />
          <Text style={[styles.text, {fontWeight: 'bold'}]}>
          {item.username}
          </Text>
          </View>
          <TouchableOpacity
          style={styles.addFriendButton}
          onPress={() => createFriendship(item)} // Use dynamic user ID and username
            >
          <Text 
            style={{fontWeight: 'bold', color: 'black', }}>
            Add Friend
          </Text>

        </TouchableOpacity>
      
      </View>
      
      )}
    />
    </View>
  );
};

export default UserList;
