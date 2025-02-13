import ProfileDetails from "../user_profile/components/ProfileDetails";
import { View, ScrollView, Text } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import React, { useState, useEffect } from 'react';
import { User, Post } from '@/data/types';
import { fetchUserByUID } from "@/data/UserDataService";
import { useLocalSearchParams } from 'expo-router';
import ProfileHeader from "../user_profile/components/ProfileHeader";
import FooterBar from "@/components/FooterBar";
import { fetchPostbyAuthor } from "@/data/PostDataService";
import {Posts} from '@/constants/posts'
import ProfilePost from "../user_profile/components/Photos/ProfilePost";


const ProfileView = () => {
    const { colorScheme, styles } = useTheme();
    const { userId } = useLocalSearchParams(); // Retrieve userId from params
    const [user, setUser] = useState<User | null>(null); 
    const [loadedPosts, setLoadedPosts] = useState<Post[] > ([]); 
    const [hasMorePosts, setHasMorePosts] = useState<boolean>(true); // Flag to check if more posts are available
    const [lastPostId, setLastPostId] = useState<string>(''); // Track the last post ID for pagination

    const loadPosts = async () => {
        try {
          // Fetch posts with the lastPostId (which is a string)
          const posts = Posts
          // const posts = await fetchPostbyAuthor(lastPostId, 'z926xE2jufbFT4XfiqEmavt1fxL2', loadedPosts); 
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
        const loadUser = async () => {
            if (!userId) return; // Ensure userId exists
            try {
                const userData = await fetchUserByUID(userId as string);
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        loadUser()
        loadPosts();
    }, [userId]); // Dependency to re-fetch if the userId changes

    return (
     <View style={styles.fullContainer}>
        <ScrollView >
            {/* <ProfileHeader /> */}

            {user ? <ProfileDetails user={user} /> : <Text>User not found</Text>}


         

            <ProfilePost 
            posts={loadedPosts}
            onLoadMore={loadPosts} // Pass loadPosts function to ProfilePost
            hasMorePosts={hasMorePosts} // Pass flag to show/hide Load More button
            />

            {/* <ProfileStatistics /> */}

        </ScrollView> 

        <View >
            <FooterBar />
        </View>
    </View>
                        // <View style={styles.fullContainer}>
                        // </View>
    );
};

export default ProfileView;

