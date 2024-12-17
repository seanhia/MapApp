import React from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  // Map container style
  const mapContainerStyle = {
    width: '100%',
    height: '700px', // Adjust height as needed
  };

  // Center of the map (example coordinates)
  const center = {
    lat: 33.7838, // Replace with your desired latitude
    lng: -118.1141, // Replace with your desired longitude
  };

  return (
    // <ImageBackground
    //   source={require('../assets/images/home.png')}
    //   style={styles.background}
    //   imageStyle={styles.image}
    // >
      <View style={styles.background}>
      {/* Map Container */}
      <View style={styles.content}>
        <LoadScript googleMapsApiKey="AIzaSyAetkasDlFSrTmAfJfAIF3ZGKTWkR6v4e0">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={12}
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </View>
     
      {/* Footer Bar */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/leaderboard')}>
          <Text style={styles.buttonText}>Leaderboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/friends')}>
          <Text style={styles.buttonText}>Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/userProfile')}>
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/tutorial')}>
          <Text style={styles.buttonText}>Tutorial</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // image: {
  //   resizeMode: 'contain',
  //   width: '100%',
  //   height: '100%',
  // },
  content: {
    flex: 1,
    width: '100%',
    height: '100%', // Ensure it takes full height
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#87CEEB', 
    paddingVertical: 10,
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
