// auth.js
import firebase from './firebase';

// Sign-in function
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    console.log("User signed in: ", user);
    return user; // Return user data or handle as needed
  } catch (error) {
    console.error("Error signing in:", error.code, error.message);
    throw error; // Re-throw error for component to handle
  }
};
