import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import { User, Notification } from '@/data/types'
import { fetchNotifications } from '@/data/Friendship';
import { router } from "expo-router";


interface NotificationsProps {
  user: User | null;
}

const Notifications: React.FC<NotificationsProps> = ({ user }) => {

  const [notifications, setNotifications] = useState<Notification[]>([]);

  const handleFriendViewProfile = async (friendId: string) => {
    console.log( "Attempting to view the following users profile", friendId );
    router.push({
      pathname: "/screens/profile_view",
      params: { userId: friendId }, // Pass friend_id as a parameter
    });
  };

  useEffect(() => {
    if (!user || !user.id) {
      console.error("User ID is undefined. Cannot fetch posts.");
      return;
      
    }
    const loadNotifications = async () => {
      try {
          const unsubscribe = await fetchNotifications(user.id, (newNotifications) => {
              setNotifications(newNotifications); 
          });
          
          return () => {
              unsubscribe();
          };
      } catch (error) {
          console.error("Error fetching posts:", error); 
      }
  };

  loadNotifications(); 

  }, [user]);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notifications</Text>
      {notifications.length === 0 ? (
        <Text style={[styles.text, { fontWeight: 100 }]}>No new notifications</Text>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleFriendViewProfile(item.userId)}>
              <Text style={[styles.text, { fontWeight: '100' }]}>{item.message}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Notifications;

