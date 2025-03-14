import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/hooks/useTheme'
import { User, Post } from '@/data/types'
import ProfileDetails from '@/app/screens/user_profile/components/ProfileDetails';
import ProfilePost from '@/app/screens/user_profile/components/Photos/ProfilePost';
import { Posts } from "@/constants/posts";
import { PrivateProfile } from './PrivateProfile';
import { UserNotFound } from './UserNotFound';

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
    const [loadedPosts, setLoadedPosts] = useState<Post[]>([]);
    const [hasMorePosts, setHasMorePosts] = useState<boolean>(true); // Flag to check if more posts are available
    const [lastPostId, setLastPostId] = useState<string>("");        // Track the last post ID for pagination
    const userPrivacy = user?.isPrivate 
    const [friendship, setFriendship] = useState<boolean>(true);  // Edit to refelct the actual friendship status 

     const loadPosts = async () => {
        try {
          // Fetch posts with the lastPostId (which is a string)
          const posts = Posts;
          // const posts = await fetchPostbyAuthor(lastPostId, 'z926xE2jufbFT4XfiqEmavt1fxL2', loadedPosts);
          if (posts && posts.length > 0) {
            setLoadedPosts((prevPosts) => [...prevPosts, ...posts]);
            setLastPostId(posts[posts.length - 1].id); // Set last post ID for next batch
          } else {
            setHasMorePosts(false); // No more posts to load
          }
        } catch (error) {
          console.error("Error loading posts");
        }
      };

    if (!user) {
        return (
            <UserNotFound />
        )
    }  else if (userPrivacy && !friendship) {
        return (
            <PrivateProfile />
        )
    } else if (user) {
        return (
            <View style={{flex: 1}}>
            {/* <ProfileDetails user={user} />  */}
            <ScrollView>

              <Text 
                style={[styles.heading, {
                    // Temporary padding
                }]}>

                </Text>  

              <ProfilePost
                posts={loadedPosts}
                onLoadMore={loadPosts} // Pass loadPosts function to ProfilePost
                hasMorePosts={hasMorePosts} // Pass flag to show/hide Load More button
              />
              {/* <ProfileStatistics /> */}
            </ScrollView>
            </View>
        );
    } 
  
};

export default FriendProfile;