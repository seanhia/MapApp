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
  const noUsers = users.length == 0; 
  
  if (noUsers) {
    return (
      <View style={styles.userListContainer}>
        <Text style={[styles.text, {color: 'black'}]}>No Users Found...</Text>
      </View>
  )}
  return (
    <View style={[styles.userListContainer]}>
      
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (

          <View style={styles.listContainer}>

            <View style={styles.leftContainer}>
              <Image // Profile Picture ({imageURL, dimensions[height, width, borderRadisu]}: Props) => {}
                  style={{width: 50, height: 50, borderRadius: 30}}
                  source={require('@/assets/images/profile-pic.jpg')}
                />
              <Text style={[styles.boldText, {color: 'black'}]}>
                {item.username}
              </Text>
            </View>

            {/** Button 
             * 
             * ToDo: create a button component
             * Button ({handleClick, text, style}: Props) => {}
            */}
            <TouchableOpacity 
              style={styles.addFriendButton}
              onPress={() => createFriendship(item)} 
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
