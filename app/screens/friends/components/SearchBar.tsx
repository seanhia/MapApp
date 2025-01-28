import React from 'react';
import { TextInput, Text, View,  } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  const { colorScheme, styles } = useTheme();
  
  return (
    <View>
      <Text style={styles.topMargin}></Text>
      <TextInput
        style={styles.input}
        placeholder="Search users..."
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};


export default SearchBar;
