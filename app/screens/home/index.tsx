import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// import { useRouter } from 'expo-router';
import sharedStyles from '@/constants/sharedStyles';
import FooterBar from '@/components/FooterBar';

export default function Home() {
  // const router = useRouter();
  const [mapCenter, setMapCenter] = useState({
    lat: 33.7838, // Replace with your desired latitude
    lng: -118.1141, // Replace with your desired longitude
  });
  const [isLoaded, setIsLoaded] = useState(false); // Tracks when the Google Maps API is ready
  const searchBoxRef = useRef(null);

  const handlePlaceChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places && places.length > 0) {
      const location = places[0].geometry.location;
      setMapCenter({
        lat: location.lat(),
        lng: location.lng(),
      });
    }
  };

  const mapContainerStyle = {
    width: '100%',
    height: '700px', // Adjust height as needed
  };

  return (
    <View style={styles.background}>
      <LoadScript
        googleMapsApiKey="AIzaSyAetkasDlFSrTmAfJfAIF3ZGKTWkR6v4e0"
        libraries={['places']}
        onLoad={() => setIsLoaded(true)} 
      >
        {isLoaded && (
          <>
            {}
            <View style={styles.searchBar}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search for places"
                ref={(input) => {
                  if (input && !searchBoxRef.current) {
                    const searchBox = new window.google.maps.places.SearchBox(input);
                    searchBox.addListener('places_changed', handlePlaceChanged);
                    searchBoxRef.current = searchBox;
                  }
                }}
              />
            </View>
            {/* Map Container */}
            <View style={styles.content}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={mapCenter}
                zoom={12}
              >
                <Marker position={mapCenter} />
              </GoogleMap>
            </View>
          </>
        )}
      </LoadScript>
      {/* Footer Bar */}
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
