// auth.js
import { createUserWithEmailAndPassword, PhoneMultiFactorGenerator, signInWithEmailAndPassword , userCredential, sendEmailVerification, reauthenticateWithCredential, EmailAuthProvider, credential} from 'firebase/auth';
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

// export const validatePassword = async (password) => {
//   try {
//     const user = auth.currentUser;
//     const cred = auth.EmailAuthProvider.credential(user.email, password)
//     await user.reauthenticateWithCredential(cred)
//     return user
//   } catch (e) {
//     alert(e.message)
//   }
// };

export const validatePassword = async (password) => {
  try {
    const user = auth.currentUser;

    // Check if a user is logged in
    if (!user) {
      throw new Error('No user is signed in');
    }

    // Generate credentials


    const cred = auth.EmailAuthProvider.credential(user.email, password);

    // Reauthenticate the user with the provided password
    await user.reauthenticateWithCredential(cred);

    // If reauthentication is successful, return the user
    return user;
  } catch (e) {
    alert(e.message);  // Show error message if something goes wrong
  }
};