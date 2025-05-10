import React, { useEffect, useState} from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { fetchCurrentUser } from '@/data/UserDataService';
import { User } from '@/data/types'
import { useTranslation } from 'react-i18next';


interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  const { colorScheme, styles } = useTheme();
  const { t } = useTranslation();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [language, setSelectedLanguage] = useState<string>('en');

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
    };

    loadCurrentUser();
  }, []);


  return (
    <View style={[styles.overlay]}>
      <TextInput
        style={styles.placeHolderInput}
        placeholder={t('search_users')}
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};



export default SearchBar;
