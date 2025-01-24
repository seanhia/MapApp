import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Platform, PermissionsAndroid } from 'react-native';
import MapComponent from '@/components/MapComponent';
import FooterBar from '@/components/FooterBar';
//import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { PlaceDetails } from '@/data/types';
import { SearchBar } from '@/components/MapSearchBar';
import Geolocation from 'react-native-geolocation-service';
import { saveLocation } from '../../../firestore';

export default function Home() {
  const [mapCenter, setMapCenter] = useState({ //default location
    lat: 33.7838, 
    lng: -118.1141, 
  });

  const [loadingLocation, setLoadingLocation] = useState(true);

  useEffect(() => {
    const getUserLocation = async () => {
      if (Platform.OS === "web") {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              console.log("Web User Location:", latitude, longitude);
              setMapCenter({ lat: latitude, lng: longitude });
    
              try {
                await saveLocation("exampleUserId", latitude, longitude, "Current location");
                console.log("Location saved to Firestore!");
              } catch (error) {
                console.error("Failed to save location:", error);
              }
            },
            (error) => {
              console.error("Error fetching location on web:", error);
              alert("Unable to fetch location. Please enable location access in your browser.");
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
        } else {
          alert("Geolocation is not supported by your browser.");
          setMapCenter({ lat: 33.7838, lng: -118.1141 });
        }
      } else {
        const hasPermission = await requestLocationPermission();
        if (!hasPermission) return;
    
        Geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            console.log("Mobile User Location:", latitude, longitude);
            setMapCenter({ lat: latitude, lng: longitude });
    
            try {
              await saveLocation("exampleUserId", latitude, longitude, "Current location");
              console.log("Location saved to Firestore!");
            } catch (error) {
              console.error("Failed to save location:", error);
            }
          },
          (error) => {
            console.error("Error fetching location on mobile:", error);
            alert("Unable to fetch location.");
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }
    };
    
  
    getUserLocation();
  }, []);
  

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
    <View style={styles.background}>

     <SearchBar onPlaceSelected={handlePlaceChanged} />
          
      <View style={styles.content}>
        <MapComponent
          initialCenter={mapCenter}
          />
      </View>
      <FooterBar />
    </View>
  );
}

const styles = StyleSheet.create({
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
