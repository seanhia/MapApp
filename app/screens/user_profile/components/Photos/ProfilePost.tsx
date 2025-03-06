import { Post } from '@/data/types'; 
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Timestamp } from 'firebase/firestore';
import { Rating } from 'react-native-ratings'; 
interface ProfilePostProp {
    posts: Post[];
  

};

const ProfilePost:  React.FC<ProfilePostProp> = ({posts }) => {
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
                   
                    <Image 
                     source={{ uri: post.image }}
                      style={styles.imagePost} 
                      resizeMode="cover"
                    />
                
                   {/* Post Title */}
                  <Text style={[styles.postTitle]}>{post.location}</Text>

                  {/* Post Content */}
                  <Text style={styles.text}>{post.review}</Text>
                  <Text style={styles.text}>Rating:</Text>
                  <Rating style={styles.rating}
                        type ="star"
                        ratingCount={5}
                        imageSize={25}
                        startingValue={post.rating}
                        />

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
  
        </View>
      );
    };

export default ProfilePost; 