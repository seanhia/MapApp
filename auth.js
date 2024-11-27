// auth.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword , userCredential} from 'firebase/auth';
import {auth} from "./firebase"

export const signUpWithEmail = async (email,password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      const user = userCredential.user;
      console.log("User signed up successfully");
      })
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
