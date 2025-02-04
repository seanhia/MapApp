import { Post } from '@/data/types'; 
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Colors} from '@/constants/Colors'

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
         images?: [URL], //Still figuring out how to store images 
         createdAt: Timestamp,
         rating: Rating,
         likes: string, 
         comment?: string
     */
    return (
        <View style={style.container}>
          <Text style={style.header}>Posts</Text>
    
          {/* Scrollable list of posts */}
          <ScrollView style={style.scrollContainer}>
            {posts.length === 0 ? (
              <Text style={style.noPostsText}>No posts to display.</Text>
            ) : (
              posts.map((post) => (
                <View key={post.id} style={style.postContainer}>
                  <Text style={style.postContent}>{post.content}</Text>
                  {/* You can add other post details here, like a timestamp or likes */}
                </View>
              ))
            )}
          </ScrollView>
    
          {/* Load more button */}
          {hasMorePosts && (
            <View style={style.buttonContainer}>
            <TouchableOpacity 
            style={[style.button,{}]}
            onPress={onLoadMore}>
                <Text style={style.buttonText}>
                    Load More
                </Text>
            </TouchableOpacity>
            </View>
          )}
        </View>
      );
    };
    
    const style = StyleSheet.create({
      container: {
        padding: 16,
        backgroundColor: '#fff',
      },
      header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
      },
      scrollContainer: {
        marginBottom: 16,
      },
      postContainer: {
        padding: 12,
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        borderColor: '#ddd',
        borderWidth: 1,
      },
      postContent: {
        fontSize: 16,
        color: '#333',
      },
      noPostsText: {
        fontSize: 18,
        color: '#999',
        textAlign: 'center',
      },
      buttonContainer: {
        alignItems: 'center', // Centers horizontally
        justifyContent: 'center', // Centers vertically
        marginVertical: 10, // Adds spacing above and below
      },
      button: {
        width: 100, // Small button size
        paddingVertical: 8, // Adjust height
        backgroundColor: Colors.light.tint, // Darker shade than the screen
        borderRadius: 8, // Rounded corners
        alignItems: 'center', // Center text
      },
      buttonText: {
        color: '#aaaaa', // White text for contrast
        fontSize: 14,
        fontWeight: 'bold',
      },
});

export default ProfilePost; 