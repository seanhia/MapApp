import { Post } from '@/data/types';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Timestamp } from 'firebase/firestore';
import { Rating } from 'react-native-ratings';
interface ProfilePostProp {
  posts: Post[];


};

const ProfilePost: React.FC<ProfilePostProp> = ({ posts }) => {
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
  const renderItem = ({ item }: { item: Post }) => (
    <View key={item.id} style={styles.postContainer}>
      {/* Post Image (if available) */}
      <Image
        source={{ uri: item.image }}
        style={styles.imagePost}
        resizeMode="cover"
      />
      {/* Post Title */}
      <Text style={[styles.postTitle]}>{item.location}</Text>

      {/* Post Content */}
      <Text style={styles.text}>{item.review}</Text>
      <Text style={styles.text}>Rating:</Text>
      <Rating style={styles.rating}
        type="star"
        ratingCount={5}
        imageSize={25}
        startingValue={item.rating}
      />

      {/* Timestamp Formatting */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.text}>
          {item.createdAt instanceof Timestamp
            ? item.createdAt.toDate().toLocaleDateString()
            : 'Invalid Date'}
        </Text>
        <Image
          source={require('@/assets/images/edit.jpg')}
          style={styles.editIcon}
        />
      </View>

    </View>
  );
  return (
    <View >
      {/* add tabs Posts | Stats | Map */}
      <Text style={[styles.heading, {}]}>Posts</Text>

      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.scrollContainer}
        ListEmptyComponent={<Text style={styles.warningMessage}>No posts to display.</Text>}
      />
    </View>
  );
};

export default ProfilePost; 