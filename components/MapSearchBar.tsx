import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {GooglePlacesAutocomplete, GooglePlaceData, GooglePlaceDetail,
} from 'react-native-google-places-autocomplete';
import { fetchCurrentUser } from '@/data/UserDataService';
import { User } from '@/data/types';
import { useTranslation } from 'react-i18next';

interface SearchBarProps {
  onPlaceSelected: (
    data: GooglePlaceData,
    details: GooglePlaceDetail | null
  ) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onPlaceSelected }) => {
  const { t } = useTranslation();
  const [language, setLanguage] = useState<string>('en');

  useEffect(() => {
    (async () => {
      try {
        const user: User | null = await fetchCurrentUser();
        setLanguage(user?.language || 'en');
      } catch (err) {
        console.error('Error fetching user', err);
      }
    })();
  }, []);

  return (
    <View style={styles.searchBar}>
      <GooglePlacesAutocomplete
  placeholder={t('search')}
  fetchDetails
  minLength={2}
  onPress={(data, details) => onPlaceSelected(data, details)}

  requestUrl={{
    url: 'http://localhost:3000/proxy',
    useOnPlatform: 'web',
  }}

  query={{
    key: 'AIzaSyBA3GzhBkw9-TB7VArb6Os-3fAUSdC2o9c',
    language,
  }}

  onFail={(err) => console.log('API error:', err)}
  onNotFound={() => console.log('No places found')}
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
  autoCompleteContainer: { flex: 1 },
  listView: {
    position: 'absolute',
    top: 50,
    backgroundColor: 'white',
    zIndex: 1000,
  },
});
