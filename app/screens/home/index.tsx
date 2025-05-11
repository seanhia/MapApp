import 'react-native-get-random-values';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Alert, Text, Image, TouchableOpacity } from 'react-native';
import MapComponent from '@/components/MapComponent';
import FooterBar from '@/components/FooterBar';
import { SearchBar } from '@/components/MapSearchBar';
import useRealTimeTracking from '../../hooks/useRealTimeTracking';
import { getAuth } from "firebase/auth";
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/hooks/useTheme';
import { Favorites } from './components/Favorites';
import { Recommendations } from './components/Recommendations';
import { saveStats } from '@/firestore';
import { fetchWeather, getSeason, createSeasonalImage } from './components/weather';
import { nearbySearch } from '@/data/MapData';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { fetchCurrentUser } from '@/data/UserDataService';
import { User } from '@/data/types'
import { useTranslation } from 'react-i18next';




export default function Home() {
  const auth = getAuth();
  const userId = auth.currentUser?.uid;
  const { t } = useTranslation();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [language, setSelectedLanguage] = useState<string>('en');


  if (!userId) {
    console.error("User is not logged in!");
    Alert.alert("Error", "You are not logged in. Please log in to use the app.");
    return (
      <View style={style.container}>
        <Text>User is not logged in. Please log in to continue.</Text>
      </View>
    );
  }

  const { colorScheme, styles } = useTheme();
  const [location, error] = useRealTimeTracking(userId, 100); // Save new location once 100 meters away
  const [mapCenter, setMapCenter] = useState({ lat: 33.7838, lng: -118.1141 });
  const [weather, setWeather] = useState<{ iconUrl?: string; description?: string; details?: any } | null>(null);
  const [isExpanded, setIsExpanded] = useState(false); // Toggle for pop-up details
  const lastFetchedLocation = useRef<{ lat: number; lng: number } | null>(null);
  var darkMode = '51d9728a5051a451'

  if (colorScheme === 'dark') {
    darkMode = '51d9728a5051a451'
  } else {
    darkMode = '37201bcde93d12e8'
  }
  const input = "california"
  const fetchAutocomplete = async (input) => {
    try {
      const response = await fetch(`http://localhost:3000/api/autocomplete?input=${input}`);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching autocomplete:", error);
    }
  };


  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
          const user = await fetchCurrentUser();
          setCurrentUser(user);
          
          const lang = user?.language || "en";
          setSelectedLanguage(lang);

      } catch (error) {
          console.error('Error fetching user:', error);
      }
  }
  
  loadCurrentUser();
  
    if (location?.coords) {
      nearbySearch(location.coords.latitude, location.coords.longitude)
        .then(results => {
          // Do something with results
          console.log('Nearby places:', results[0].id);
        });
    }
    if (location) {
      console.log("Real-time location:", location.coords.latitude, location.coords.longitude);
      const { latitude, longitude } = location.coords;
      setMapCenter({ lat: latitude, lng: longitude });
      fetchWeather(latitude, longitude)
        .then(setWeather)
        .catch(() => Alert.alert("Unable to fetch weather data."));
    }

    if (userId) {
      saveStats(userId);
    }

    if (error) {
      console.error("Error with real-time tracking:", error);
      Alert.alert("Error", error.toString());
    }
  }, [location, error]);

  useFocusEffect(
    useCallback(() => {
      console.log("[Home] Home screen focused: rechecking location and weather");

      if (location?.coords) {
        const { latitude, longitude } = location.coords;
        setMapCenter({ lat: latitude, lng: longitude });

        fetchWeather(latitude, longitude)
          .then(setWeather)
          .catch(() => Alert.alert("Unable to fetch weather data."));
      }

      return () => {
        // Optional cleanup
      };
    }, [location])
  );


  const handlePlaceChanged = (data: any, details: any) => {
    if (details?.geometry) {
      const { lat, lng } = details.geometry.location;
      setMapCenter({ lat, lng });
      fetchWeather(lat, lng)
        .then(setWeather)
        .catch(() => Alert.alert("Unable to fetch weather data."));
    }
  };
  colorScheme === 'dark' ? Colors.dark.background : Colors.light.background

  return (
    <View style={[styles.fullContainer, { flexDirection: 'row' }]}>
      <SearchBar onPlaceSelected={handlePlaceChanged} />
      <View style={style.mapContainer}>
        <MapComponent
          initialCenter={mapCenter}
          weatherIcon={weather?.iconUrl}
          mapId={darkMode}
          userId={userId}
        />
      </View>


      {/* Weather Icon */}
      {weather?.iconUrl && (
        <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)} style={style.weatherBox}>
          <Image source={{ uri: weather.iconUrl }} style={style.weatherIcon} />
        </TouchableOpacity>
      )}

      {/* Seasonal Icon */}
      {location && (
        <TouchableOpacity style={style.seasonBox}>
          <Image
            source={createSeasonalImage(getSeason(location.coords.latitude))}
            style={style.seasonIcon}
          />
        </TouchableOpacity>
      )}

      <Recommendations userId={userId} />
      <Favorites userId={userId} />

      {/* Weather Details */}
      {isExpanded && weather?.details && (
        <View style={style.weatherPopup}>
          <Text style={style.weatherDescription}>{weather.details.weather[0]?.description}</Text>
          <Text>
            {t('temp')}{weather.details.main?.temp}°C</Text>
          <Text>
            {t('hum')}
            {weather.details.main?.humidity}%</Text>
          <Text>
            {t('wind')}
            {weather.details.wind?.speed} m/s</Text>
        </View>
      )}


      <FooterBar />
      <Recommendations userId={userId} />
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
  weatherBox: {
    position: "absolute",
    top: 180,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },
  seasonBox: {
    position: "absolute",
    top: 260,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
  seasonIcon: {
    width: 50,
    height: 50,
  },
  weatherPopup: {
    position: "absolute",
    top: 80,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },
  weatherDescription: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
    fontWeight: "bold",
  },
});
