import { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, Modal, Pressable } from 'react-native'
import { FavoriteLoc, User } from '@/data/types'
import { useTheme } from '@/hooks/useTheme'
import { fetchUsersFavLocation } from '@/data/UserDataService'

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

                        {Array.isArray(favLocations) && favLocations.length > 1 ? (
                            favLocations.map((favorite) => (
                                <View key={favorite.id} style={styles.text}>
                                    <Text style={styles.text}>{favorite.name}</Text>
                                </View>
                            ))
                        ) : (
                        <Text style={styles.text}>No favorite locations yet.</Text> 
                        )}
                            
                        <View style={{justifyContent:'flex-end', flex: 1, flexDirection: 'column'}}>
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