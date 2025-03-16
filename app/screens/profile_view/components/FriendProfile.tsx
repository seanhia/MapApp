import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/hooks/useTheme'
import { User, Post, status } from '@/data/types'
import ProfileDetails from '@/app/screens/user_profile/components/ProfileDetails';
import ProfilePost from '@/app/screens/user_profile/components/Photos/ProfilePost';
import { PrivateProfile } from './PrivateProfile';
import { UserNotFound } from './UserNotFound';
import { Loading } from '@/components/Loading'
import UserPhotos from '../../user_profile/components/Photos/UserPhotos';
import { Posts } from '@/app/screens/profile_view/components/Posts'
import { existingFriendshipQuery } from '@/data/Friendship';
import { fetchCurrentUser } from '@/data/UserDataService';


/**
 * Friends Profile View 
 * 
 * Cases: 
 *      user not found 
 *      user is private and not your friend
 *      all other cases result in viewing the users profile
 */

interface FriendProfileProps {
   user: User | null
}

const FriendProfile: React.FC<FriendProfileProps> = ({ user }) => { 
    const { styles } = useTheme()
    const userPrivate = user?.isPrivate 
    const [friendship, setFriendship] = useState<boolean>(true);  // Edit to reflect the actual friendship status 
    const [loading, setLoading] = useState<boolean>(true); 

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
        checkFriendship(); 
    }, [user]); 
    
    if (loading) return <Loading/>
    if (!user) return <UserNotFound/>
    if (user.isPrivate && !friendship) return <PrivateProfile />

    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <Text style={[styles.heading, {}]}> </Text>  
          <Posts user={user}/>
        </ScrollView>
      </View>
    );
} 
  


export default FriendProfile;