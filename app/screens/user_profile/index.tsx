import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import ProfileHeader from './components/ProfileHeader'
import ProfileDetails from './components/ProfileDetails'
//import ProfilePost from './components/Photos/ProfilePost'
import UserPhotos from './components/Photos/UserPhotos';
import { useRouter } from 'expo-router';
import ProfileStatistics from './components/ProfileStatistics';
import { useTheme } from '@/hooks/useTheme';
import FooterBar from '@/components/FooterBar';
import { User, Post } from '@/data/types'
import { fetchCurrentUser } from '@/data/UserDataService';
import { fetchPostbyAuthor } from '@/data/PostDataService';


const userProfile = () => {
  const { colorScheme, styles } = useTheme();
  const router = useRouter();
  const [loadedPosts, setLoadedPosts] = useState<Post[] > ([]); 
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [hasMorePosts, setHasMorePosts] = useState<boolean>(true); // Flag to check if more posts are available
  const [lastPostId, setLastPostId] = useState<string>(''); // Track the last post ID for pagination

   const loadPosts = async () => {
    try {
      // Fetch posts with the lastPostId (which is a string)
      const posts = await fetchPostbyAuthor(lastPostId, 'z926xE2jufbFT4XfiqEmavt1fxL2', loadedPosts);  // Static User ID 
      if (posts && posts.length > 0) {
        setLoadedPosts((prevPosts) => [...prevPosts, ...posts]);
        setLastPostId(posts[posts.length - 1].id); // Set last post ID for next batch
      } else {
        setHasMorePosts(false); // No more posts to load
      }
    } catch (error) {
      console.error('Error loading posts');
    }
  };

   useEffect(() => {
      const loadCurrentUser = async () => {
          try {
              const user = await fetchCurrentUser();
              setCurrentUser(user)
              console.log(user)
          } catch (error) {
              // console.error('Error fetching user')
          }
      }
      
      loadCurrentUser();
      loadPosts();
        }, []);

         // Log the updated posts when the state changes
  useEffect(() => {
    console.log('Loaded Posts:', loadedPosts);
  }, [loadedPosts]); // This will log the posts whenever the loadedPosts state changes
  
  
  
  return (
      <View style={styles.fullContainer}>
        <ScrollView >

          <ProfileHeader />

          <ProfileDetails 
            user={currentUser} />

          {/*<UploadPhoto />*/}
          <UserPhotos/>

          {/*<ProfilePost 
            posts={loadedPosts}
            onLoadMore={loadPosts} // Pass loadPosts function to ProfilePost
            hasMorePosts={hasMorePosts} // Pass flag to show/hide Load More button
            />*/}

          <ProfileStatistics />

        </ScrollView> 

        <View >
          <FooterBar />
        </View>
      </View>
  );
};

export default userProfile;
