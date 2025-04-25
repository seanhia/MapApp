import { useState, useEffect } from 'react'
import { StyleSheet, View, Alert, Text, Image, TouchableOpacity, Modal, Pressable, Dimensions } from 'react-native';
import { RecommendationLoc , User } from '@/data/types'
import { useTheme } from '@/hooks/useTheme'
import { fetchUsersFavLocation, writeData, writeFavLocation } from '@/data/UserDataService'
import { nearbySearch, getPictureByID } from '@/data/MapData';
import useRealTimeTracking from '../../../hooks/useRealTimeTracking';
import { FlatList } from 'react-native-gesture-handler';

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
    const [recommend, setRecommend] = useState<string>(''); 
    const [location, error] = useRealTimeTracking(userId, 100); // Save new locatio
    const [placeId, setPlaceId] = useState<string>('');
    const [modalVisible, setModalVisible] = useState<boolean>(false); 
    const [placePic, setImg] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const loadPlace = async () => {
      setLoading(true)

      try {
        if (location?.coords) {
        const recHolder = await nearbySearch(location.coords.latitude, location.coords.longitude)
        if (recHolder)
          setRecommend(recHolder[0].displayName)
          
        
          setPlaceId(recHolder[0].id)
          
        }
        console.log(placeId)
        const imgHolder = await getPictureByID(placeId)
        if (imgHolder){
          setImg(imgHolder)
        }
      } catch (e: any){
        console.log(e)
      }

    }
    const handleButtonPress = () => {
      loadPlace()
      setModalVisible(true)
    }

    // useEffect(() => {
    //   if (location?.coords) {
        
    //         nearbySearch(location.coords.latitude, location.coords.longitude)
    //             .then(results => {
    //               if (results == undefined) {
    //                 return 0;
    //               }
    //                 // Do something with results
    //                 console.log(results[0].displayName)
    //                 setRecommend(results[0].displayName)
    //                 setPlaceId(results[0].id)
    //             });
    //         getPictureByID(placeId).then(result => {
    //           if (result == undefined) {
    //             return 0;
    //           }
    //           setImg(result)
    //         })
    //       } else {
    //         console.log("NO COORDS")
    //       }

    // }, [userId]) 

    
    return (
    <View>
      <TouchableOpacity
      style={style.recBox}
      onPress={handleButtonPress}>
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
                      {/* <FlatList data={recommend} keyExtractor={(item) => item.id}
                          renderItem={({ item }) => (
                              <View style={style.row}>
                                  <Text style={style.username}>{item.displayName + ". " + item.id}</Text>
                        
                              </View>
                                )}/> */}
                    <Text style={styles.heading}> {recommend}</Text>
                    <Image
                      style={style.stretch}
                      source={{uri: placePic}}
                      resizeMode='contain'
                      />
                    </View>
                    <Pressable
            style={styles.button}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.buttonText}>Close</Text>
        </Pressable>
          </View>
          
        </Modal>
    </View>
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
    position: "fixed",
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
},
username: {
  fontSize: 20, // Adjusted for mobile readability
  fontWeight: 'bold',
  color: '#333',
},
stretch: {
  flex: 1,
  width: 200,
  height: 400,
},
});