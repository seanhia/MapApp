import { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, Modal, Pressable, ScrollView, TextInput } from 'react-native'
import { FavoriteLoc, User } from '@/data/types'
import { useTheme } from '@/hooks/useTheme'
import { fetchUsersFavLocation, writeData, writeFavLocation } from '@/data/UserDataService'

type Props = {
    userId: string
}

{/**
    Returns users favorites list 
    Usage: 
        1) MapComponent to display favorite location pins on each users map 
        2) Modal List to add/delete favorites 
    */}

export const Favorites = ({userId}: Props)  => {
    const { styles } = useTheme()
    const [favLocations, setFavLocations] = useState<FavoriteLoc[] | null>(null); 
    const [location, setLocation] = useState<string>('');
    const [placeId, setPlaceId] = useState<string>('');
    const [modalVisible, setModalVisible] = useState<boolean>(false); 

    const favList = fetchUsersFavLocation(userId)
    console.log('favList: ', favList)

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                setFavLocations(await fetchUsersFavLocation(userId)); 
                console.log(`favorite locations: ${favLocations}`)
            } catch (error) {
                console.error(error)
            }
        }        
        fetchFavorites(); 
    }, [userId]) 

    const handleAddFavLoc = async () => {    
        if (!location) {
            console.error("Location is required");
            return;
        }   
        let data: FavoriteLoc = { // implement accepting user input
            id: Math.random().toString(36).substring(2, 15),
            name: location,
            latitude: '',
            longitude: '',
        }
        try {
            await writeFavLocation(userId, data, 'add')
            setFavLocations(prev => prev ? [...prev, data] : [data]); 
            setLocation(''); 
        } catch (error ) {
            console.error("Error adding favorite location:", error);
        }
    }

    const handleDeleteFavLoc = async (locationId: string) => {
        try {
          await writeFavLocation(userId, locationId, 'remove');
          setFavLocations((prev) => prev ? prev.filter(loc => loc.id !== locationId) : []);
        } catch (error) {
          console.error('Error deleting favorite location:', error);
        }
      };

    return (
        <View>
            <TouchableOpacity
                style={styles.homePageButton}
                onPress={ () => setModalVisible(true)}
            >
                <Image
                style={{height: 40, width: 40}}
                source={require('@/assets/images/favLocation.png')}
                />
            </TouchableOpacity>

            {/* <View style={styles.centered}> */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View style={styles.centered}>
                    <View style={styles.modalView}>
                        <Text style={styles.heading}>Favorite Locations</Text>
                        <ScrollView>
                        {Array.isArray(favLocations) && favLocations.length >= 1 ? (
                            favLocations.map((favorite) => (
                                <View key={favorite.id} style={styles.leftContainer}>
                                    <Text style={styles.text}>{favorite.name}</Text>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => {
                                            handleDeleteFavLoc(favorite.id)
                                            setFavLocations(favLocations.filter((loc) => loc.id !== favorite.id))
                                            console.log('Trying to delete:', favorite.id);
                                        }}
                                    >
                                        <Image
                                            style={{position: 'static', height: 10, width: 10}}
                                            source={require('@/assets/images/delete.png')}
                                        />
                                    </TouchableOpacity>
                                </View>
                            ))
                        ) : (
                        <Text style={styles.text}>No favorite locations yet.</Text> 
                        )}
                        </ScrollView>
                            
                        
                        <View style={{justifyContent:'flex-end', flex: 1, flexDirection: 'column'}}>
                            {/** Add button to add a favorite location to your list */}
                            <TextInput
                                style={styles.button}
                                value={location}
                                onChangeText={setLocation}
                                autoCapitalize="none"
                                keyboardType="default"
                                placeholder="Add Favorite Location"
                            />
                            <Pressable
                                style={[styles.button, {margin: 10, borderRadius: 35}]}
                                onPress={() => {
                                    handleAddFavLoc()
                                }}
                                >
                                <Text style={styles.buttonText}>+</Text>
                            </Pressable>

                            <Pressable
                                style={styles.button}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}