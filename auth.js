// auth.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword , userCredential} from 'firebase/auth';
import {auth} from "./firebase"

export const signUpWithEmail = async (email,password, user) => {
  try {
    const userCrential = await createUserWithEmailAndPassword(auth, email, password, user);
    // const user = userCredential.user;
    console.log("User signed up successfully:", user);
    return user;
  } catch (error) {
      console.error("Error signing up", error.code, error.message);
      throw error;
  }
}

// Sign-in function
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User signed in: ", user);
    return user; // Return user data or handle as needed
  } catch (error) {
    console.error("Error signing in:", error.code, error.message);
    throw error; // Re-throw error for component to handle
  }
};
