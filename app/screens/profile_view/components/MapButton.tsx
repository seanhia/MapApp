import React, {useEffect, useState} from "react";
import { View, Button, StyleSheet} from "react-native";
import { User, status, Friend} from "@/data/types";
import { useRouter} from "expo-router";
import { fetchCurrentUser } from '@/data/UserDataService';
import { existingFriendshipQuery } from '@/data/Friendship';


export const MapButton = ({user}: {user: User | null}) => {
    const router = useRouter();
    const [friendship, setFriendship] = useState<boolean>(true);
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

    return (
        <View style={{flex: 1}}>
            <Button
                title={`View ${user?.username}'s Map`}
                onPress={()=> router.push({pathname: "/screens/friend_map", params: {friendId: user?.id}})}
            />
        </View>
    )
}