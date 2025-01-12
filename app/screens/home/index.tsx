import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapComponent from '@/components/MapComponent';
import FooterBar from '@/components/FooterBar';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { PlaceDetails } from '@/data/types';
import { SearchBar } from '@/components/MapSearchBar';

export default function Home() {
  const [mapCenter, setMapCenter] = useState({
    lat: 33.7838, // Replace with your desired latitude
    lng: -118.1141, // Replace with your desired longitude
  });

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
