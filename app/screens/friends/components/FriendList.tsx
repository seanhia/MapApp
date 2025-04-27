import React, {useState} from 'react';
import { FlatList, Text, ScrollView, TouchableOpacity, Image, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Friend, User } from "@/data/types"
import menu from "@/assets/images/favicon.png"
import { useProfileImage } from '@/hooks/useProfileImage';
import { Button } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context';
import GraphVisualizer from '@/components/GraphVisualization';



interface FriendListProps {
  friends: Friend[];
  current_user: User;
  onViewProfile: (id: Friend) => void;
  onUnfriend: (id: Friend) => void;
  onRecommend: (current_user: User) => void;
}

const FriendList = ({ friends, current_user, onViewProfile, onUnfriend, onRecommend}: FriendListProps) => {
  const { colorScheme, styles } = useTheme();
  
  return (
    <FlatList
      data={friends}
      keyExtractor={(item) => item.id}
      scrollEnabled={true}
      ListHeaderComponent={
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={
            [styles.header, {marginTop: 90}]}>
            Friends
          </Text>
          <TouchableOpacity
            style={[styles.button, {marginTop: 90, marginRight: 20}]}
            onPress={() => onRecommend(current_user)}>
            <Text style={styles.buttonText}>Recommendations</Text>
          </TouchableOpacity>
        </View>
        }

      renderItem={({ item }) => (
        <View style={styles.listContainer}>
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

            <TouchableOpacity 
              style={[styles.sideButton, {maxWidth: 100}]}
              onPress={() => onUnfriend(item)}>
              <Text style={styles.buttonText}>Unfriend</Text>
            </TouchableOpacity> 
          
          </View>
      )}
    />
  );
};

export default FriendList;


