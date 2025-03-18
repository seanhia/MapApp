import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import { User, Notification } from '@/data/types'
import { fetchNotifications } from '@/data/Friendship';


interface NotificationsProps {
  user: User | null;
}

const Notifications: React.FC<NotificationsProps> = ({ user }) => {

  const [notifications, setNotifications] = useState<Notification[]>([]);

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
            <TouchableOpacity >
              <Text style={[styles.text, { fontWeight: 100 }]}>{item.message}</Text>
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

