import { User, Post } from '@/data/types';
import { View, Text, FlatList, TouchableOpacity, Image, Alert, Modal, TextInput } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Timestamp } from 'firebase/firestore';
import { Rating } from 'react-native-ratings';
import React, { useState } from 'react';
import { updatePost } from '@/data/PostDataService';
import { deletePost } from '@/data/PostDataService';


interface ProfilePostProp {
  posts: Post[];
  user: User | null ;


};

const ProfilePost: React.FC<ProfilePostProp> = ({ posts, user}) => {
  const { colorScheme, styles } = useTheme();
  //to edit post info
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [newLocation, setNewLocation] = useState('');
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(0);

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

  const openModal = (post: Post) => {
    // sets fields based on current information 
    setSelectedPost(post);
    setNewLocation(post.location);
    setNewReview(post.review);
    setNewRating(post.rating);
    setModalVisible(true);

  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPost(null);
  };

  const handleSave = () => {
    if (selectedPost) {
      if (!user || !user.id) {
        console.error("User ID is undefined. Cannot save post.");
        return;
    }
      updatePost(user.id, selectedPost.id, newLocation, newReview, newRating);
      Alert.alert('Success', 'Post details updated.');
      closeModal();
    } else {
      Alert.alert('Failed', 'Updating post details. ');
    }
  };
  const handleDelete = () => {
    if (selectedPost) {
      if (!user || !user.id) {
        console.error("User ID is undefined. Cannot save post.");
        return;
    }
      deletePost(user?.id, selectedPost.id, selectedPost.image || "");
      Alert.alert('Success', 'Post deleted.');
      closeModal();
    } else {
      Alert.alert('Failed', 'Deleting post. ');
    }
  };

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
        readonly
      />

      {/* Timestamp Formatting */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.text}>
          {item.createdAt instanceof Timestamp
            ? item.createdAt.toDate().toLocaleDateString()
            : 'Invalid Date'}
        </Text>
        <TouchableOpacity onPress={() => openModal(item)}>
          <Image
            source={require('@/assets/images/edit.jpg')}
            style={styles.editIcon}
          />
        </TouchableOpacity>
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
      {/* Edit or delete photo */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.centered}>
          <View style={styles.modalView}>
            <View style={styles.centered}>
              <Text style={styles.title}>Photo Details</Text>
              <TextInput
                style={styles.placeHolderInputPhoto}
                placeholder={newLocation}
                value={newLocation}
                onChangeText={setNewLocation}
              />
              <TextInput
                style={styles.placeHolderInputPhoto}
                placeholder={newReview}
                multiline
                value={newReview}
                onChangeText={setNewReview}
              />
              <Text style={styles.text}>Rate the location:</Text>
              <Rating style={styles.rating}
                type="star"
                ratingCount={5}
                imageSize={25}
                startingValue={newRating}
                onFinishRating={setNewRating}
              />

              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleSave}>
                  <Text style={styles.text}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDelete}>
                  <Text style={styles.text}>Delete</Text>
                </TouchableOpacity>

              </View>
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.text}>Cancel</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>


      </Modal>
    </View>

  );
};

export default ProfilePost; 