import { StyleSheet, useColorScheme, Dimensions } from "react-native";
import { Colors } from "../constants/Colors";


type colorSchemeName = "light" | "dark" | null | undefined;

{
  /*
   * This file contains global styling definitions for the application,
   * including theme-based styles and dark mode logic.
   *
   * - Supports light and dark themes with dynamic switching.
   * - Utilizes reusable style objects to maintain code.
   *
   * Any modifications to global styles should be made here to maintain consisten UI
   */
}
const { width } = Dimensions.get('window');
const numColumns = 3; // 3 post per row
const postMargin = 5;
const postWidth = (width - (2.70 * postMargin) * (numColumns + 1)) / numColumns; // calculate post width
const baseFontSize = width * 0.05; // can be adjusted to percantage size of the screen 
const iconSize = width * 0.025;

const sharedStyles = (colorScheme: colorSchemeName) => {
  const theme = colorScheme || "light";
  return StyleSheet.create({
    /** Colors */
    background: {
      backgroundColor:
        theme === "dark" ? Colors.dark.background : Colors.light.background
    },
    /** Spacing */
    topMargin: {
      padding: 10,
    },
    /** Text */
    title: {
      fontSize: 50,
      fontWeight: "normal",
      marginBottom: 10,
      color: theme === "dark" ? Colors.dark.text : Colors.light.text,
      alignSelf: "center",
    },
    header: {
      width: "95%",
      flexDirection: "row",
      alignSelf: "center",
      padding: 20,
      // backgroundColor: theme === 'dark' ? Colors.dark.tint : Colors.dark.tint,
      fontWeight: "bold",
      color: theme === "dark" ? Colors.dark.tint : Colors.light.tint,
      fontSize: 20,
      borderRadius: 25,
    },
    heading: {
      fontSize: 24,
      padding: 20,
      fontWeight: "bold",
      marginBottom: 20,
      color: theme === "dark" ? Colors.dark.text : Colors.light.text,
    },
    text: {
      fontSize: 16,
      color: theme === "dark" ? Colors.dark.text : Colors.light.text,
      padding: 10,
    },
    buttonText: {
      fontSize: 15,
      color: theme === "dark" ? Colors.light.text : Colors.light.text,
      padding: 10,
    },
    boldText: {
      fontSize: 16,
      color: theme === "dark" ? Colors.dark.text : Colors.light.text,
      flex: 1.5,
      fontWeight: "bold",
      alignSelf: "center",
      padding: 10,
    },
    input: {
      width: "100%",
      height: 50,
      backgroundColor: theme === "dark" ? Colors.dark.tint : Colors.light.tint,
      borderRadius: 25,
      paddingHorizontal: 20,
      fontSize: 16,
      color: "#000000",
      marginBottom: 20,
    },
    placeHolderInput: {
      width: "100%",
      height: 50,
      backgroundColor: theme === "dark" ? Colors.dark.tint : Colors.light.tint,
      borderRadius: 25,
      paddingHorizontal: 20,
      fontSize: 16,
      color:
        theme === "dark" ? Colors.dark.placeHolder : Colors.light.placeHolder,
      marginBottom: 20,
    },
    placeHolderInputPhoto: {
      width: "100%",
      height: 65,
      backgroundColor: theme === "dark" ? Colors.dark.tint : Colors.light.tint,
      borderRadius: 25,
      paddingHorizontal: 20,
      fontSize: 16,
      color:
        theme === "dark" ? Colors.dark.placeHolder : Colors.light.placeHolder,
      marginBottom: 20,
    },
    item: {
      padding: 10,
      backgroundColor: theme === "dark" ? Colors.dark.tint : Colors.light.tint,
      borderRadius: 8,
      marginBottom: 10,
    },
    label: {
      fontSize: 16,
      fontWeight: "500",
      color: theme === "dark" ? Colors.dark.text : Colors.light.text,
    },
    profileDetailText: {
      fontSize: 25,
      fontWeight: "bold",
      color: theme === "dark" ? Colors.dark.text : Colors.light.text, // Highlighted color
    },
    warningMessage: {
      fontSize: 18,
      color: theme === "dark" ? Colors.dark.text : Colors.light.text,
      textAlign: "center",
    },
    postTitle: {
      fontSize: 16,
      color: theme === "dark" ? Colors.dark.text : Colors.light.text,
      alignSelf: "center",
      fontWeight: "bold",
    },

    /** Containers  */
    basicContainer: {
      padding: 16,
      backgroundColor:
        theme === "dark" ? Colors.dark.background : Colors.light.background,
    },
    centerContainer: {
      //Centered Page with margin
      marginHorizontal: 40,
      flex: 1,
      justifyContent: "space-evenly",
      backgroundColor:
        theme === "dark" ? Colors.dark.background : Colors.light.background,
    },
    fullContainer: {
      //Horizonatal Full Page
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-evenly",
      backgroundColor:
        theme === "dark" ? Colors.dark.background : Colors.light.background,
    },


    halfContainer: {
      //Vertical Half Page
      marginHorizontal: 40,
      flex: 0.6,
      justifyContent: "space-around",
      backgroundColor:
        theme === "dark" ? Colors.dark.background : Colors.light.background,
    },
    scrollContainer: {
      padding: 12,
      backgroundColor:
        theme === "dark" ? Colors.dark.background : Colors.light.background,
    },
    buttonContainer: {
      width: "85%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignSelf: "center",
      marginTop: 20,
    },
    listContainer: {
      width: "85%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      alignSelf: "center",
      paddingVertical: 10,
      marginVertical: 5,
    },
    leftContainer: {
      flexDirection: "row",
      justifyContent: 'space-between',
      alignItems: "center",
    },
    Container: {
      flexDirection: "row",
      justifyContent: "flex-start",
      marginTop: 10,
      marginBottom: 20,
    },
    profileContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      paddingTop: 30,
    },
    postContainer: {
      width: postWidth,
      marginLeft: postMargin,
      marginRight: postMargin,
      padding: 12,
      marginBottom: 10,
      backgroundColor:
        theme === "dark" ? Colors.dark.background : Colors.light.background,
      borderRadius: 8,
      borderColor: "#ddd",
      borderWidth: 1,
    },
    searchBarContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
      // zIndex: 100, 
      backgroundColor:
        theme === "dark" ? Colors.dark.background : Colors.light.background,
      borderRadius: 8,
    },
    tutorialContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme === "dark" ? Colors.dark.background : Colors.light.background
    },

    /** Buttons  */
    button: {
      // width: "100%",
      backgroundColor: theme === "dark" ? Colors.dark.tint : Colors.light.tint,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      padding: 10
    },
    lightButton: {
      width: "100%",
      height: 50,
      backgroundColor:
        theme === "dark" ? Colors.dark.button : Colors.light.button,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 10,
    },
    sideButton: {
      width: "50%",
      height: 50,
      backgroundColor: theme === "dark" ? Colors.dark.tint : Colors.light.tint,
      borderRadius: 25,
      margin: 5,
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    footerButton: {
      padding: 10,
      alignItems: "center",

      color:
        theme === "dark" ? Colors.dark.background : Colors.light.background,
    },
    tutorialButton: {
      width: 100,
      paddingVertical: 8,
      // backgroundColor: Colors.light.tint,
      borderRadius: 28,
      alignItems: "center",
    },
    addFriendButton: {
      width: 100,
      height: 30,
      backgroundColor: theme === "dark" ? Colors.dark.button : 'white',
      borderRadius: 8,
      justifyContent: "flex-end",
      alignItems: "center",
      marginBottom: 10,
      paddingVertical: 8,
    },
    // Favorite Location
    homePageButton: {
      justifyContent: 'center',
      backgroundColor: theme === "dark" ? Colors.dark.button : Colors.light.button,
      alignItems: 'center',
      padding: 15,
      borderRadius: 10,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
      position: "absolute",
      top: 100,
      right: 20,
    },

    /** Images  */
    image: {
      width: 220,
      height: 200,
      marginBottom: 20,
      alignSelf: "center",
    },
    profilePicture: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    imagePost: {
      width: postWidth,
      height: postWidth,
      marginBottom: 10,
      alignSelf: "center",
    },
    tutorialImage: {
      width: '50%',
      height: '50%',
      marginBottom: 10,
      alignSelf: "center",
      resizeMode: "contain"
    },

    /** Components  */
    footer: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      backgroundColor: theme === "dark" ? Colors.dark.tint : Colors.light.tint,
      paddingVertical: 10,
    },

    /** Links  */
    rightLink: {
      color:
        theme === "dark"
          ? Colors.dark.tabIconDefault
          : Colors.light.tabIconDefault,
      fontSize: 16,
      alignSelf: "flex-end",
      marginBottom: 30,
    },
    tutorial: {
      color:
        theme === "dark"
          ? Colors.dark.tabIconDefault
          : Colors.light.tabIconDefault,
      fontSize: 30,
      marginTop: 15,
      marginHorizontal: 10,
    },

    /** Modal */
    centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      width: "55%",
      height: "55%",
      margin: 20,
      backgroundColor: theme === "dark" ? Colors.dark.background : Colors.light.background,
      borderRadius: 20,
      padding: 35,
      shadowColor: theme === "dark" ? Colors.dark.tabIconDefault : Colors.light.tabIconDefault,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      color: theme === "dark" ? Colors.dark.text : Colors.light.text,
    },

    /**Photo Details */

    rating: {
      color: theme === "dark" ? Colors.dark.text : Colors.light.text,
      padding: 10,
    },

    /** Post */
    photoItemContainer: {
      flex: 1 / 3,
      margin: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      overflow: 'hidden',
    },
    photoImage: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
    },
    photoDetails: {
      padding: 4,
    },
    photoList: {
      marginTop: 20,
    },
    editIcon: {
      width: iconSize,
      height: iconSize,

    },

    /** Overlay */
    overlay: {
      position: 'absolute', // ✅ Makes it overlay other components
      top: 10,             // Adjust to position at the top
      left: 20,            // Aligns to the left
      right: 20,           // Aligns to the right
      backgroundColor: theme === "dark" ? Colors.dark.background : Colors.light.background,
      zIndex: 10,        // ✅ Keeps it on top of other elements
      borderRadius: 10,
      padding: 0,
      elevation: 3,       // ✅ Adds shadow for better visibility on Android
    },
    overlayUserItem: {
      padding: 10,
      borderBottomWidth: 1,
      color: theme === "dark" ? Colors.dark.background : Colors.light.background,
    },
    userListContainer: {
      position: 'absolute',
      top: 80, // Appears below the search bar
      left: 20,
      right: 20,
      backgroundColor: theme === "dark" ? Colors.light.tint : Colors.light.tint,
      borderRadius: 10,
      padding: 10,
      elevation: 5,
      shadowColor: '#fff',
      // shadowOffset: { width: 0, height: 1},
      shadowOpacity: .8,
      // shadowRadius: 3,
      zIndex: 5, // Lower than searchBar, but above the main content
    },

    //notif
    sidebar: {

      top: 0,
      bottom: 0,
      right: 0,
      width: '33%',
      backgroundColor: '#f0f0f0',
      padding: 20,
      zIndex: 10,
    },

    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    notificationDrawer: {
      width: '40%',
      height: '100%',
      backgroundColor: 'white',
      position: 'absolute',
      top: 0,
      right: 0,
      padding: 20,
    },
    // Language 
    card: {
      borderRadius: 8,
      padding: 20,
      marginBottom: 30,
      backgroundColor: theme === "dark" ? Colors.dark.tint : Colors.light.tint,
      color:
        theme === "dark" ? Colors.dark.placeHolder : Colors.light.placeHolder,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },

    labels: {
      fontSize: 16,
      marginBottom: 10,
      color: '#000',
    },
    picker: {
      height: 50,
      width: '100%',
      color: '#000',
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
    },

    x: {
      height: 50,
      width: 50,
    },
    spinGlobe: {
      height: 150,
      width: 150,
      padding: 5,
      margin: 5,
      justifyContent: 'center',
      borderRadius: 5,
      alignItems: 'center',
    },
    progressBar: {
      height: 12,
      width: '75%',
      backgroundColor: '#ccc',
      borderRadius: 6,
      overflow: 'hidden',
      marginTop: 10,
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#4CAF50',
    }, 
    header2: {
      // backgroundColor: theme === 'dark' ? Colors.dark.tint : Colors.dark.tint,
      fontWeight: "bold",
      color: theme === "dark" ? Colors.dark.tint : Colors.light.tint,
      fontSize: 30
    },
    

  });
};

export default sharedStyles;