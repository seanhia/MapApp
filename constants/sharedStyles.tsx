import { StyleSheet, useColorScheme } from "react-native";
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

const sharedStyles = (colorScheme: colorSchemeName) => {
  const theme = colorScheme || "light";
  return StyleSheet.create({
    /** Spacing */
    topMargin: {
      padding: 10,
    },
    /** Text */
    title: {
      fontSize: 60,
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
    lowerContainer: {
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
      padding: 12,
      marginBottom: 10,
      backgroundColor:
        theme === "dark" ? Colors.dark.background : Colors.light.background,
      borderRadius: 8,
      borderColor: "#ddd",
      borderWidth: 1,
    },

    /** Buttons  */
    button: {
      width: "100%",
      height: 50,
      backgroundColor: theme === "dark" ? Colors.dark.tint : Colors.light.tint,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
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
    smallButton: {
      width: 100, // Small button size
      paddingVertical: 8, // Adjust height
      backgroundColor: Colors.light.tint,
      borderRadius: 8, // Rounded corners
      alignItems: "center", // Center text
    },

    /** Images  */
    image: {
      width: 220,
      height: 200,
      marginBottom: 20,
      alignSelf: "center",
    },
    profilePicture: {
      width: 70,
      height: 64,
      borderRadius: 40,
    },
    imagePost: {
      width: 300,
      height: 300,
      marginBottom: 10,
      alignSelf: "center",
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
      width: "50%",
      height: "50%",
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
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
    },

    /**Photo Details */

    rating: {
      color: theme === "dark" ? Colors.dark.text : Colors.light.text,
      padding: 10,
    },
  });
};

export default sharedStyles;
