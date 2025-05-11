import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { User, Notification } from '@/data/types'
import { fetchNotifications, updateNotification } from '@/data/Friendship';
import { router } from "expo-router";
import { fetchCurrentUser } from '@/data/UserDataService';
import { useTranslation } from 'react-i18next';



interface NotificationsProps {
  user: User;
}

const Notifications: React.FC<NotificationsProps> = ({ user }) => {

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { t } = useTranslation();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [language, setSelectedLanguage] = useState<string>('en');



  //updates notifications and displays friend's profile 
  const handleNotifictaion = async (notification: Notification) => {
    //updates notifications to true and deletes it from the database 
    const update = await updateNotification(user?.id, notification);
    //view friend's profile 
    router.push({
      pathname: '/screens/profile_view',
      params: { userId: notification.postUserId || notification.friendRequestUserId },
    });

  };

  useEffect(() => {
    //check userid 
    if (!user || !user.id) {
      console.error("User ID is undefined. Cannot fetch posts.");
      return;

    }
    //loads notifications 

    const loadCurrentUser = async () => {
      try {
        const user = await fetchCurrentUser();
        setCurrentUser(user);

        const lang = user?.language || "en";
        setSelectedLanguage(lang);

      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };


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
    loadCurrentUser();

  }, [user]);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('notif')}</Text>
      {notifications.length === 0 ? (
        <Text style={[styles.text, { fontWeight: 100 }]}>{t('no_new_notif')}</Text>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          scrollEnabled={true}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleNotifictaion(item)}>
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

