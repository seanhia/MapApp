import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { PlaceDetails } from '@/data/types';

interface SearchBarProps {
  onPlaceSelected: (
    data: any, 
    details: PlaceDetails) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({ onPlaceSelected }) => {
    return (
      <View style={styles.searchBar}>
        <GooglePlacesAutocomplete
          placeholder="Search for places"
          fetchDetails={true} // Ensures detailed information is returned
          onPress={onPlaceSelected}
          query={{
            key: 'AIzaSyBA3GzhBkw9-TB7VArb6Os-3fAUSdC2o9c', // Replace with your API key
            language: 'en',
          }}
          styles={{
            textInput: styles.searchInput,
            container: styles.autoCompleteContainer,
          }}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    searchBar: {
      position: 'absolute',
      top: 10,
      width: '90%',
      alignSelf: 'center',
      zIndex: 1,
    },
    searchInput: {
      height: 40,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      backgroundColor: '#fff',
    },
    autoCompleteContainer: {
      flex: 0, // Prevents the autocomplete from stretching
    },
  });
  