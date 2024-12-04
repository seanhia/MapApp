// auth.js
import { createUserWithEmailAndPassword, PhoneMultiFactorGenerator, signInWithEmailAndPassword , userCredential} from 'firebase/auth';
import {auth} from "./firebase"
import { doc, setDoc } from "firebase/firestore"; 
import {db} from "./firebase"

export const signUpWithEmail = async (email,password, fname, lname, phone, username) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      const user = userCredential.user;
      setDoc(doc(db, "users", user.uid), {
        email: email,
        firstname: fname,
        lastname: lname,
        phonenumber: phone,
        username: username
      });
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
