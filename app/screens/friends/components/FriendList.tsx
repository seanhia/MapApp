import React, { useState, useEffect } from 'react';
import { FlatList, Text, ScrollView, TouchableOpacity, Image, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Friend, GraphData, User } from "@/data/types"
import menu from "@/assets/images/favicon.png"
import { useProfileImage } from '@/hooks/useProfileImage';
import { Button } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context';
import GraphVisualizer from '@/app/screens/friend_rec/components/GraphVisualization';
import { fetchCurrentUser } from '@/data/UserDataService';
import { useTranslation } from 'react-i18next';





interface FriendListProps {
  friends: Friend[];
  current_user: User;
  onViewProfile: (id: Friend) => void;
  onUnfriend: (id: Friend) => void;
  onRecommend: (userId: string) => void;
}

const FriendList = ({ friends, current_user, onViewProfile, onUnfriend, onRecommend }: FriendListProps) => {
  const { colorScheme, styles } = useTheme();
  const { t } = useTranslation();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [language, setSelectedLanguage] = useState<string>('en');

  useEffect(() => {
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

    loadCurrentUser();
  }, []);


  return (
    <FlatList
      data={friends}
      keyExtractor={(item) => item.id}
      scrollEnabled={true}
      ListHeaderComponent={
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={
            [styles.header, { marginTop: 90 }]}>
            {t('friends')}
          </Text>
          <TouchableOpacity
            style={[styles.button, { marginTop: 90, marginRight: 20 }]}
            onPress={() => onRecommend(current_user.uid)}>
            <Text style={styles.buttonText}>{t('rec')}</Text>
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
            style={[styles.sideButton, { maxWidth: 100 }]}
            onPress={() => onUnfriend(item)}>
            <Text style={styles.buttonText}>{t('unfriend')}</Text>
          </TouchableOpacity>

        </View>
      )}
    />
  );
};

export default FriendList;


