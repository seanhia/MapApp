import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { createFriendship } from '@/data/Friendship';
import { User, Friend } from '@/data/types';
import sharedStyles from '@/constants/sharedStyles';
import { fetchCurrentUser } from '@/data/UserDataService';
import { useTranslation } from 'react-i18next';



interface UserListProps {
  users: User[];
  visible: boolean;
  onViewProfile: (id: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users, visible, onViewProfile }) => {
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


  if (!visible) return null;
  const noUsers = users.length == 0;

  if (noUsers) {
    return (
      <View style={styles.userListContainer}>
        <Text style={[styles.text, { color: 'black' }]}>{t('no_users_found')}</Text>
      </View>
    )
  }
  return (
    <View style={[styles.userListContainer]}>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        scrollEnabled={true}
        renderItem={({ item }) => (

          <View style={styles.listContainer}>

            <View style={styles.leftContainer}>
              <Image // Profile Picture ({imageURL, dimensions[height, width, borderRadisu]}: Props) => {}
                style={{ width: 50, height: 50, borderRadius: 30 }}
                source={require('@/assets/images/profile-pic.jpg')}
              />
              <TouchableOpacity
                onPress={() => onViewProfile(item)}>
                <Text style={[styles.boldText, { color: 'black' }]}>
                  {item.username}
                </Text>
              </TouchableOpacity>
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
                style={{ color: 'black', }}>
                {t('add_friend')}
              </Text>
            </TouchableOpacity>

          </View>
        )}
      />

    </View>
  );
};

export default UserList;
