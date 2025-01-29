// auth.js
import { createUserWithEmailAndPassword, PhoneMultiFactorGenerator, signInWithEmailAndPassword , userCredential, sendEmailVerification, reauthenticateWithCredential, EmailAuthProvider, credential, getAuth, updateEmail} from 'firebase/auth';
import {auth} from "./firebase"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import {db} from "./firebase"


export const signUpWithEmail = async (email,password, fname, lname, phone, username) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      const user = userCredential.user;
      if (user != null) {
        sendEmailVerification(auth.currentUser);
      }
      setDoc(doc(db, "users", user.uid), {
        eMail: email,
        firstName: fname,
        lastName: lname,
        phoneNumber: phone,
        username: username,
        createdAt: serverTimestamp()
      }
      
    );
    
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

export const validatePassword = async (password) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    // Check if a user is logged in
    if (!user) {
      throw new Error('No user is signed in');
    }

    // Generate credentials
    const cred = EmailAuthProvider.credential(user.email, password);
    // Reauthenticate the user with the provided password
    await reauthenticateWithCredential(user, cred);
    console.log("Reauth Successful")
    // If reauthentication is successful, return the user
    return user;
  } catch (e) {
    throw e  // Show error message if something goes wrong
  }
};

export const changeEmail = async (newEmail) => {
  try {
    const auth = getAuth();
    await updateEmail(auth.currentUser, newEmail);
    return
  }
  catch (e) {
    throw e;
  }
}