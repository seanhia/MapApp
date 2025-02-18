import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import UploadPhoto from './UploadPhoto';
import PhotoModal from './PhotoModal';
import ProfilePost from './ProfilePost';
import { User, Post } from '@/data/types'
import { fetchCurrentUser } from '@/data/UserDataService';
import { fetchPostbyAuthor } from '@/data/PostDataService';
import { Rating } from 'react-native-ratings';

interface PhotoDetails {
    imageUri: string | null;
    location: string;
    review: string;
    rating: number;
}


const UserPhotos = () => {

    const { colorScheme, styles } = useTheme();
    const [userImage, setUserImage] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [photoDetails, setPhotoDetails] = useState<any[]>([]);
    const [loadedPosts, setLoadedPosts] = useState<Post[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [hasMorePosts, setHasMorePosts] = useState<boolean>(true); // Flag to check if more posts are available
    const [lastPostId, setLastPostId] = useState<string>(''); // Track the last post ID for pagination
    const [isLoading, setIsLoading] = useState(false);
    const [loadingInitialPosts, setLoadingInitialPosts] = useState(true);



    const handleImageSelect = (uri: string) => {
        setUserImage(uri);
        setModalVisible(true);
    };


    const handleModalSubmit = (location: string, review: string, rating: number) => {
        const newPhotoDetail = { location, review, rating, imageUri: userImage };
        setPhotoDetails([...photoDetails, newPhotoDetail]);
        setUserImage(null);
        setModalVisible(false); // Close the modal after submission
    };

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

    const renderPhoto = ({ item }: { item: PhotoDetails }) => (
        <View style={styles.photoItemContainer}>
            {item.imageUri && (<Image source={{ uri: item.imageUri }} style={styles.photoImage} />)}
            <View style={styles.photoDetails}>
                <Text style={styles.boldText}>{item.location}</Text>
                <Text style={styles.text}>Rating:
                <Rating style={styles.rating}
                    type="star"
                    ratingCount={5}
                    imageSize={15}
                    readonly={true} 
                    startingValue={item.rating}/> 

                </Text>
                <Text style={styles.text}>Review: {item.review}</Text>
            </View>
        </View>
    )



    return (

        <View>
            <UploadPhoto onImageSelect={handleImageSelect} />


            <PhotoModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleModalSubmit}
            />
            <View style={styles.postContainer}>

                <FlatList
                    data={photoDetails}
                    renderItem={renderPhoto}
                    keyExtractor={(item, index) => index.toString()} //replace with database id
                    numColumns={3}
                    style={styles.photoList}
                />

            </View>

        </View>


    );

};
export default UserPhotos;