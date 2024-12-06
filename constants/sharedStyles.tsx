import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

const sharedStyles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF5E1',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#000000',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFE5B4',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default sharedStyles;