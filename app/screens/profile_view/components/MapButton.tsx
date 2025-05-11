import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { User, status, Friend } from "@/data/types";
import { useRouter } from "expo-router";
import { fetchCurrentUser } from '@/data/UserDataService';
import { existingFriendshipQuery } from '@/data/Friendship';
import { useTheme } from '@/hooks/useTheme'
import { useTranslation } from 'react-i18next';




export const MapButton = ({ user }: { user: User | null }) => {
  const router = useRouter();
  const { styles } = useTheme();
  const [friendship, setFriendship] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const { t } = useTranslation();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [language, setSelectedLanguage] = useState<string>('en');

  useEffect(() => {
    const checkFriendship = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const currentUser = await fetchCurrentUser();
        if (currentUser) {
          const friendStatus = await existingFriendshipQuery(currentUser, user);
          if (friendStatus[1] == status[1]) {
            setFriendship(true)
          } else {
            setFriendship(false)
          }
        }
      } catch (error) {
        console.error('Error checking friendship: ', error);
      } finally {
        setLoading(false);
      }
    };
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
    checkFriendship();
    loadCurrentUser();

  }, [user]);

  return (
    <View>
      <TouchableOpacity
        style={[styles.sideButton, {}]}
        // title={`View ${user?.username}'s Map`}
        onPress={() => router.push({ pathname: "/screens/friend_map", params: { friendId: user?.id } })}
      >
        <Text style={styles.buttonText}> {t('viewMap', { username: user?.username || '' })}</Text>
      </TouchableOpacity>
    </View>
  )
}