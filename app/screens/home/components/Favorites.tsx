import { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { FavoriteLoc, User } from '@/data/types'
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
    const [favLocations, setFavLocations] = useState<FavoriteLoc[] | null>(null); 

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
        
   



    // Based on the passed in prop 'user' fetch the favorite locations (query in user)
        // FetchFavLocations(userId: string) => return([{}])

    return (
        <View>
        <Text style={{fontSize: 17, fontWeight: 'bold'}}>FAVORITE LOCATIONS: </Text>
        {favLocations?.map((favorite) => (
            <View key={favorite?.id}>
                <Text>{favorite?.name}</Text>
            </View>
        ))}
        </View>
    );
   

}