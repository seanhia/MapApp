import { Post } from '@/data/types'; 
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Colors} from '@/constants/Colors'
import {Posts}  from '@/constants/posts'
import { Timestamp } from 'firebase/firestore';

interface ProfilePostProp {
    posts: Post[];
    onLoadMore: () => void; // Function to trigger loading more posts
    hasMorePosts: boolean; 

};

const ProfilePost:  React.FC<ProfilePostProp> = ({posts, onLoadMore, hasMorePosts}) => {
    const { colorScheme, styles } = useTheme();

    /**
     * TESTING: COMPONENT CAN BE CHANGED TO PROVIDE POST DATA TO USER PROFILE 
     * use the shared styles to have consistent dark and light mode
     * 
     * Post data for reference:
         id: string,
         title: string,
         content: string,
         published: boolean, 
         authorUid: string, 
         images?: ,
         createdAt: Timestamp,
         rating: Rating,
         likes: User[], 
         comment?: string[]
     */
    return (
        <View style={[styles.fullContainer, {alignItems:'center'}]}>
          {/* add tabs Posts | Stats | Map */}
          <Text style={[styles.heading, {}]}>Posts</Text> 
    
          {/* Scrollable list of posts */}
          <ScrollView style={[styles.scrollContainer, {alignContent:'center'}]}>
            {posts.length === 0 ? (
              <Text style={styles.warningMessage}>No posts to display.</Text>
            ) : (
              posts.map((post) => (
                  
                <View key={post.id} style={styles.postContainer}>
                   {/* Post Image (if available) */}
                   {post.images && post.images.length > 0 && (
                    <Image 
                      source={typeof post.images?.[0] === 'string' ? { uri: post.images[0] } : post.images?.[0]} 
                      style={styles.imagePost} 
                      resizeMode="cover"
                    />
                  )}
                   {/* Post Title */}
                  <Text style={[styles.postTitle]}>{post.title}</Text>

                  {/* Post Content */}
                  <Text style={styles.text}>{post.content}</Text>

                  {/* Timestamp Formatting */}
                  <Text style={styles.text}>
                    {post.createdAt instanceof Timestamp
                      ? post.createdAt.toDate().toLocaleDateString()
                      : 'Invalid Date'}
                  </Text>
                  {/* You can add other post details here, like a timestamp or likes */}
                </View>
                
              ))
            )}
          </ScrollView>
    
          {/* Load more button */}
          {hasMorePosts && (
            <View style={[styles.buttonContainer, {justifyContent: 'center'}]}>
            <TouchableOpacity 
            style={[styles.smallButton]}
            onPress={onLoadMore}>
                <Text style={[styles.buttonText, {fontWeight: 'bold'}]}>
                    Load More
                </Text>
            </TouchableOpacity>
            </View>
          )}
        </View>
      );
    };

export default ProfilePost; 