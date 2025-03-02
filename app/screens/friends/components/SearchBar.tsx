import React from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  const { colorScheme, styles } = useTheme();
  
  return (
    <View style={[styles.overlay]}>
      <TextInput
        style={styles.placeHolderInput}
        placeholder="Search users..."
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};



export default SearchBar;
