import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import UploadPhoto from './UploadPhoto';
import PhotoModal from './PhotoModal';
import ProfilePost from './ProfilePost';

const UserPhotos = () => {

    const [userImage, setUserImage] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [photoDetails, setPhotoDetails] = useState<any[]>([]); 

    
    const handleImageSelect = (uri: string) => {
        setUserImage(uri);  
        setModalVisible(true); 
    };

    
    const handleModalSubmit = (location: string, description: string, rating: number) => {
        const newPhotoDetail = { location, description, rating, imageUri: userImage };
        setPhotoDetails([...photoDetails, newPhotoDetail]);
        setModalVisible(false); // Close the modal after submission
    };

    return (

        <View>
            <UploadPhoto onImageSelect={handleImageSelect} />


        <PhotoModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleModalSubmit} 
            /> 
        </View>
    );

};
export default UserPhotos;