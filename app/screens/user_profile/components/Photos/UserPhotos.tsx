import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import UploadPhoto from './UploadPhoto';
import PhotoModal from './PhotoModal';
import { User, Post } from '@/data/types'
import { savePost } from '@/data/PostDataService';
import { loadPosts } from '@/data/PostDataService';
import ProfilePost from './ProfilePost';

interface UserPhotosProps{
    user: User | null ;
}


const UserPhotos: React.FC<UserPhotosProps> = ({ user}) => {

    const { colorScheme, styles } = useTheme();
    const [userImage, setUserImage] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [posts, setPosts] = useState<Post[]>([]);




    const handleImageSelect = (uri: string) => {
        setUserImage(uri);
        setModalVisible(true);
    };


    const handleModalSubmit = async (location: string, review: string, rating: number) => {
        if (!userImage ){
            console.error("No image selected!");
            return;
        }
        if (!user || !user.id) {
            console.error("User ID is undefined. Cannot save post.");
            return;
        }
        await savePost(user.id, userImage, location, review, rating);
        setUserImage(null);
        setModalVisible(false); // Close the modal after submission
    };

   
    useEffect (() => {
        if (!user || !user.id) {
            console.error("User ID is undefined. Cannot fetch posts.");
            return;
        }
        const fetchPosts = async () => {
            try {
                const unsubscribe = await loadPosts(user.id, (newPosts) => {
                    setPosts(newPosts); 
                });
                
                return () => {
                    unsubscribe();
                };
            } catch (error) {
                console.error("Error fetching posts:", error); 
            }
        };
    
        fetchPosts(); 

    },[user]); // re-runs whenever user changes 


    return (

        <View>
            <UploadPhoto onImageSelect={handleImageSelect} />


            <PhotoModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleModalSubmit}
            />
            <ProfilePost
            posts={posts}/>
        </View>


    );

};
export default UserPhotos;