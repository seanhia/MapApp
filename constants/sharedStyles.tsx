import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

const sharedStyles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.light.background,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#000000',
    marginBottom: 20,
  },
  buttonContainter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.light.tint,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1, 
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: Colors.light.text,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.light.tint,
    paddingVertical: 10,
  },
  footerButton: {
    padding: 10,
    alignItems: 'center',
    color: Colors.light.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 25,
    backgroundColor: Colors.light.tint,
    fontWeight: 'bold',
    color: Colors.light.text,
    fontSize: 20,
    borderRadius: 25,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    alignSelf: 'center',
  },
   item: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 10,
    },
});

export default sharedStyles;