import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Platform, PermissionsAndroid } from 'react-native';
import MapComponent from '@/components/MapComponent';
import FooterBar from '@/components/FooterBar';
import { PlaceDetails } from '@/data/types';
import { SearchBar } from '@/components/MapSearchBar';
import Geolocation from 'react-native-geolocation-service';
import useRealTimeTracking from "../../hooks/useRealTimeTracking"; // Adjust the path as needed
import { getAuth } from "firebase/auth"; // For getting the userId
import { useTheme } from '@/hooks/useTheme';
import { Colors } from '@/constants/Colors';


export default function Home() {
  const { colorScheme, styles } = useTheme();
  const auth = getAuth();
  const userId = auth.currentUser?.uid; // Get the current user's ID

  // check if user is logged in
  if (!userId) {
    console.error("User is not logged in!");
    Alert.alert("Error", "You are not logged in. Please log in to use the app.");
    return null;
  }

  // use the real-time tracking hook to get user's current location
  const [location, error] = useRealTimeTracking(userId, 100); // Radius of 100 meters
  const [mapCenter, setMapCenter] = useState({ lat: 33.7838, lng: -118.1141 }); // Default location

  // Update map center whenever the user's location changes
  useEffect(() => {
    if (location) {
      console.log("Real-time location:", location.coords.latitude, location.coords.longitude);
      setMapCenter({ lat: location.coords.latitude, lng: location.coords.longitude });
    }
    if (error) {
      console.error("Error with real-time tracking:", error);
      Alert.alert("Error", error);
    }
  }, [location, error]);
  

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; // iOS handles permissions separately
  };

  const handlePlaceChanged = (
    data:any, 
    details: PlaceDetails | null
  ) => {
    if (details && details.geometry) {
      const location = details.geometry.location;
      setMapCenter({
        lat: location.lat,
        lng: location.lng,
      });
    }
  };

  return (
    <View style={{backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background, flex: 1}}>

     <SearchBar onPlaceSelected={handlePlaceChanged} />
          
      <View style={style.content}>
        <MapComponent
          initialCenter={mapCenter}
          />
      </View>
      <FooterBar />
    </View>
  );
}

const style = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    position: 'absolute',
    top: 10,
    width: '90%',
    zIndex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchInput: {
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  button: {
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});
