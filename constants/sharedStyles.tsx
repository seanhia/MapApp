import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

const sharedStyles = StyleSheet.create({
  title: {
    fontSize: 60,
    fontWeight: 'normal',
    marginBottom: 10,
    color: Colors.light.text,
    alignSelf: 'center',
  
  },
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
  container: {
    marginHorizontal: 40,
    flex: .9,
    justifyContent: 'space-evenly',
  },
  halfContainer: {
    marginHorizontal: 40, 
    flex: .6, 
    justifyContent: 'space-around'
  },
  buttonContainer: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: 20,
  },
  lowerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.light.tint,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightButton: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.light.background,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
  },
  sideButton: {
    width: '50%',
    height: 50,
    backgroundColor: Colors.light.tint,
    borderRadius: 25,
    margin: 5,
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
    padding: 10,
  },
  boldText: {
    fontSize: 16,
    color: Colors.light.text,
    flex: 1.5, 
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 10, 
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
    width: '95%',
    flexDirection: 'row',
    // justifyContent: 'center',
    alignSelf: 'center',
    padding: 20,
    backgroundColor: Colors.light.tint,
    fontWeight: 'bold',
    color: Colors.light.text,
    fontSize: 20,
    borderRadius: 25,
  },
  image: {
    width: 220,
    height: 200,
    marginBottom: 20,
    alignSelf: 'center',
  },
  profilePicture: { // Testing this style
    width: 90,
    height: 80,
    borderRadius: 40,
    },
   item: {
      padding: 10,
      backgroundColor: '#fff',
      borderRadius: 8,
      marginBottom: 10,
    },
    rightLink: {
      color: Colors.light.tabIconDefault,
      fontSize: 16,
      alignSelf: 'flex-end',
      marginBottom: 30,
    },
    tutorial: {
      color: Colors.light.tabIconDefault,
      fontSize: 30,
      marginTop: 15,
      marginHorizontal: 10,
    },
});

export default sharedStyles;