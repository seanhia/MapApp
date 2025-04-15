import { useState, useEffect } from 'react'
import { StyleSheet, View, Alert, Text, Image, TouchableOpacity, Modal, Pressable } from 'react-native';
import { RecommendationLoc , User } from '@/data/types'
import { useTheme } from '@/hooks/useTheme'
import { fetchUsersFavLocation, writeData, writeFavLocation } from '@/data/UserDataService'
import { nearbySearch } from '@/data/MapData';
import useRealTimeTracking from '../../../hooks/useRealTimeTracking';

type Props = {
    userId: string
}

{/**
    Returns users favorites list 
    Usage: 
        1) MapComponent to display favorite location pins on each users map 
        2) Modal List to add/delete favorites 
    */}

export const Recommendations = ({userId}: Props)  => {
    const { styles } = useTheme()
    const [recommend, setRecommend] = useState<RecommendationLoc | null>(null); 
    const [location, error] = useRealTimeTracking(userId, 100); // Save new locatio
    const [placeId, setPlaceId] = useState<string>('');
    const [modalVisible, setModalVisible] = useState<boolean>(false); 

    
    useEffect(() => {
      if (location?.coords) {
            nearbySearch(location.coords.latitude, location.coords.longitude)
                .then(results => {
                    // Do something with results
                    console.log(results[0].displayName)
                    setRecommend(results[0])
                });
          }
    }, [userId]) 

    
    return (
    <view>
      <TouchableOpacity
      style={style.recBox}
      onPress={() => setModalVisible(true)}
    >
      <Image
        style={{height: 40, width: 40}}
        source={require('@/assets/images/globe.png')}
        />
    </TouchableOpacity>
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.centered}>
                    <View style={styles.modalView}>
                        <Text style={styles.heading}>Favorite Locations</Text>
                    </View>
          </View>
          <Pressable
            style={styles.button}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.buttonText}>Close</Text>
        </Pressable>
        </Modal>
    </view>
    );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  mapContainer: {
    flex: 1,
    height: '100%',
  },
  
  recBox: {
    position: "absolute",
    top: 100,
    left: 20,
    backgroundColor: "rgba(217, 186, 13, 0.88)", // Light effect
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, 
  },
});