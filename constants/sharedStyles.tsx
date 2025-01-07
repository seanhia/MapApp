import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

const sharedStyles = StyleSheet.create({
  /** Text */
  title: {
    fontSize: 60,
    fontWeight: 'normal',
    marginBottom: 10,
    color: Colors.light.text,
    alignSelf: 'center',
  },
  header: {
    width: '95%',
    flexDirection: 'row',
    alignSelf: 'center',
    padding: 20,
    backgroundColor: Colors.light.tint,
    fontWeight: 'bold',
    color: Colors.light.text,
    fontSize: 20,
    borderRadius: 25,
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
  item: {
    padding: 10,
    backgroundColor: Colors.light.tint,
    borderRadius: 8,
    marginBottom: 10,
  },

  /** Containers  */
  centerContainer: { //Centered Page with margin 
    marginHorizontal: 40,
    flex: 1,
    justifyContent: 'space-evenly',
  },
  fullContainer: { //Horizonatal Full Page 
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  halfContainer: { //Vertical Half Page 
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
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 30,
},

  /** Buttons  */
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
  footerButton: {
    padding: 10,
    alignItems: 'center',
    color: Colors.light.background,
  },
  
  
  /** Images  */
  image: {
    width: 220,
    height: 200,
    marginBottom: 20,
    alignSelf: 'center',
  },
  profilePicture: { 
    width: 90,
    height: 80,
    borderRadius: 40,
    },

  /** Components  */
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


    /** Links  */
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