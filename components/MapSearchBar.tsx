import React from 'react';
import { StyleSheet, TextInput, View, Image } from 'react-native';
import { GooglePlacesAutocomplete, GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import { PlaceDetails } from '@/data/types';

interface SearchBarProps {
  onPlaceSelected: (
    data: GooglePlaceData,
    details: GooglePlaceDetail | null) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({ onPlaceSelected }) => {
  return (
      <View style={styles.searchBar}>
        <GooglePlacesAutocomplete
          placeholder="Search for places"
          fetchDetails={true}
          minLength={2} // wait for at least 2 characters before searching
          onPress={(data, details) => {
            console.log("Selected Place:", data, details); // Debugging
            onPlaceSelected(data, details);
          }}
          requestUrl={{
            url: 'http://localhost:3000/proxy',
            useOnPlatform: 'all',
          }}
          
          query={{
            language: 'en',
          }}

          onFail={(error) => console.log("API Error:", error)} // Debug API errors
          onNotFound={() => console.log("No Places Found")} // Log if no results

          styles={{
            textInput: styles.searchInput,
            container: styles.autoCompleteContainer,
            listView: styles.listView,
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
    flex: 1,
  },
  listView: {
    position: 'absolute',
    top: 50,
    backgroundColor: 'white',
    zIndex: 1000, // Ensures it appears above other elements
  },
});
