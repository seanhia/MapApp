import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Alert, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Rating } from 'react-native-ratings'; // to install package run npm install react-native-ratings
import { fetchCurrentUser } from '@/data/UserDataService';
import { User } from '@/data/types'
import { useTranslation } from 'react-i18next';

interface PhotoModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (location: string, review: string, rating: number) => void;
}

const PhotoModal: React.FC<PhotoModalProps> = ({ visible, onClose, onSubmit }) => {

    const { colorScheme, styles } = useTheme();
    const [location, setLocation] = useState('');
    const [review, setReview] = useState('')
    const [rating, setRating] = useState(0);
    const { t } = useTranslation();
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [language, setSelectedLanguage] = useState<string>('en');

    useEffect(() => {
        const loadCurrentUser = async () => {
            try {
                const user = await fetchCurrentUser();
                setCurrentUser(user);

                const lang = user?.language || "en";
                setSelectedLanguage(lang);

            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        loadCurrentUser();
    }, []);


    const handleSubmit = () => {
        if (!location || !review || rating === 0) {
            Alert.alert('Missing fields', 'Please fill in all the fields.');
            return;
        }

        onSubmit(location, review, rating);
        setLocation('');
        setReview('');
        setRating(0);
        onClose();
    };

    const cancelUpload = () => {
        setLocation('');
        setReview('');
        setRating(0);
        onClose();
    };


    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centered}>
                <View style={styles.modalView}>
                    <View style={styles.centered}>
                        <Text style={styles.title}>{t('pd')}</Text>
                        <TextInput
                            style={styles.placeHolderInputPhoto}
                            placeholder={t('enter_loc')}
                            value={location}
                            onChangeText={setLocation}
                        />
                        <TextInput
                            style={styles.placeHolderInputPhoto}
                            placeholder={t('enter_review')}
                            multiline
                            value={review}
                            onChangeText={setReview}
                        />
                        <Text style={styles.text}>{t('rate')}</Text>
                        <Rating style={styles.rating}
                            type="star"
                            ratingCount={5}
                            imageSize={25}
                            startingValue={rating}
                            onFinishRating={setRating}
                        />

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={cancelUpload}>
                                <Text style={styles.text}>{t('cancel')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleSubmit}>
                                <Text style={styles.text}>{t('sub')}</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>
            </View>


        </Modal>
    )


};


export default PhotoModal 