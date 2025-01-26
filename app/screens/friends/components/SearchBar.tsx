import React from 'react';
import { TextInput, Text, View,  } from 'react-native';
import sharedStyles from '@/constants/sharedStyles';

interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <View>
      <Text style={sharedStyles.topMargin}></Text>
      <TextInput
        style={sharedStyles.input}
        placeholder="Search users..."
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};


export default SearchBar;
