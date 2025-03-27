import React from 'react';
import { FlatList, Text, ScrollView, TouchableOpacity, Image, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Friend } from "@/data/types"
import menu from "@/assets/images/favicon.png"
import { useProfileImage } from '@/hooks/useProfileImage';
import { Button } from 'react-native-paper'



interface FriendListProps {
  friends: Friend[];
  onViewProfile: (id: Friend) => void;
  onUnfriend: (id: Friend) => void;
}

const FriendList = ({ friends, onViewProfile, onUnfriend }: FriendListProps) => {
  const { colorScheme, styles } = useTheme();
  
  return (
    <FlatList
      data={friends}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ScrollView contentContainerStyle={styles.listContainer}>
          <View style={styles.leftContainer}>
  
            <TouchableOpacity 
              style={styles.leftContainer}
              onPress={() => onViewProfile(item)}>
                 <Image
                  style={styles.profilePicture}
                  source={item.friendProfilePhoto ? { uri: item.friendProfilePhoto } : require('@/assets/images/cloud.png')}
                />
                <Text style={styles.boldText}>@{item.friendUsername}</Text>
              </TouchableOpacity>
              </View>

            {/* <TouchableOpacity 
              style={styles.sideButton}
              onPress={() => onViewProfile(item)}>
              <Text style={styles.buttonText}>View Profile</Text>
            </TouchableOpacity> */}
            

            <Button 
              icon="menu"
              children
              style={styles.leftContainer}
              onPress={() => onUnfriend(item)}>
              {/* <Image source={menu}></Image> */}
              {/* <Text style={styles.buttonText}>Unfriend</Text> */}
            </Button>

        </ScrollView>
      )}
    />
  );
};

export default FriendList;
// function useState<T>(arg0: null): [any, any] {
//   throw new Error('Function not implemented.');
// }

