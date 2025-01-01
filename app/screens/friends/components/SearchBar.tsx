import React from 'react';
import { TextInput } from 'react-native';
import sharedStyles from '@/constants/sharedStyles';

interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <TextInput
      style={sharedStyles.input}
      placeholder="Search users..."
      value={value}
      onChangeText={onChange}
    />
  );
};


export default SearchBar;
