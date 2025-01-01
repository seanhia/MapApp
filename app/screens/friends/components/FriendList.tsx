import React from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import sharedStyles from '@/constants/sharedStyles';

interface Friend {
  id: string;
  friendId: string;
  friendUsername: string;
}

interface FriendListProps {
  friends: Friend[];
}

const FriendList: React.FC<FriendListProps> = ({ friends }) => {
  return (
    <FlatList
      data={friends}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.friendItem}>
          <Text style={styles.friendText}>{item.friendUsername}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  friendItem: {
    padding: 10,
    backgroundColor: '#e6f7ff',
    borderRadius: 8,
    marginBottom: 10,
  },
  friendText: {
    fontSize: 16,
  },
});

export default FriendList;
