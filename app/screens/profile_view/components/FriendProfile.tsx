import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/hooks/useTheme'
import { User, Post, status } from '@/data/types'
import { PrivateProfile } from './PrivateProfile';
import { UserNotFound } from './UserNotFound';
import { Loading } from '@/components/Loading'
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
    const [isPrivate, setIsPrivate] = useState<boolean | null >(null);
    const [friendship, setFriendship] = useState<boolean | null>(null);  // Edit to reflect the actual friendship status 
    const [loading, setLoading] = useState<boolean>(true); 

    useEffect(() => {
      const checkFriendship = async () => {
        if (!user) {
          setTimeout(() => setLoading(false), 500);
          return; 
        } 
        setIsPrivate(user.isPrivate); 
     
        try {
          const currentUser = await fetchCurrentUser();
          if (currentUser) {
            const friendStatus = await existingFriendshipQuery(currentUser, user);
              setFriendship(!!(friendStatus[1] == status[1]));
            }
        } catch (error) {
          console.error('Error checking friendship: ', error);
        } finally {
          setLoading(false);
        }
      }; 
        checkFriendship(); 
    }, [user]); 
    
    let content; 
    if (loading) content = <Loading/>

    else if (!user) content = <UserNotFound/>
    else if ((isPrivate && !friendship) || (isPrivate && (friendship == null))) content = <PrivateProfile />
    else if (friendship || !isPrivate
    ) content = (
      <View style={{flex: 1}}>
        <ScrollView>
          <Text style={[styles.heading, {}]}> </Text>  
          <Posts user={user}/>
        </ScrollView>
      </View>
    );

    return <>{content}</>
} 
  


export default FriendProfile;