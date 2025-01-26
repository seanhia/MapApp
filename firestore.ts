//import firestore from '@react-native-firebase/firestore';
import {getFirestore, addDoc, collection, getDocs, setDoc, doc, deleteDoc, serverTimestamp} from 'firebase/firestore';
import app from './firebase'

//const db = firebase.firestore();
const db = getFirestore(app);

// Create a document in a collection
export const createDocument = async (collectionName: string, data: any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (error) {
    console.error('Error creating document: ', error);
    throw error;
  }
};

// Get all documents from a collection
export const getDocuments = async (collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
  } catch (error) {
    console.error('Error getting documents: ', error);
    throw error;
  }
};

// Update a document
export const updateDocument = async (collectionName: string, docId: string, data: any) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await setDoc(docRef, data, {merge: true}); // Merge updates the fields without overwriting the whole document
  } catch (error) {
    console.error('Error updating document: ', error);
    throw error;
  }
};

// Delete a document
export const deleteDocument = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting document: ', error);
    throw error;
  }
};

/**
 * Save a location to the user's subcollection in Firestore
 * @param userId - The ID of the user
 * @param latitude - Latitude of the location
 * @param longitude - Longitude of the location
 */

// Save location
export const saveLocation = async (
  userId: string,
  latitude: number,
  longitude: number,
): Promise<void> => {
  if (!userId) {
    throw new Error("User ID is required to save location.");
  }
  try {
    const userDocRef = doc(db, "users", userId); // Reference to the user's document
    const locationsRef = collection(userDocRef, "locations"); // Subcollection under the user document
    console.log("Saving to Firestore path:", locationsRef.path);

    await addDoc(locationsRef, {
      latitude,
      longitude,
      timestamp: Date.now(),
    });
    console.log("Location saved successfully.");
  } catch (error) {
    console.error("Error saving location:", error);
    throw error;
  }
};

/**
 * Fetch all locations from the user's subcollection in Firestore
 * @param userId - The ID of the user
 * @returns An array of location data
 */
export const fetchLocations = async (
  userId: string
): Promise<{ latitude: number; longitude: number}[]> => {
  if (!userId) {
    throw new Error("User ID is required to fetch locations.");
  }

  try {
    const userDocRef = doc(db, "users", userId); // Reference to the user's document
    const locationsRef = collection(userDocRef, "locations"); // Subcollection under the user document
    const querySnapshot = await getDocs(locationsRef);
    console.log("Fetching from Firestore path:", locationsRef.path);

    return querySnapshot.docs.map((doc) => ({
      latitude: doc.data().latitude,
      longitude: doc.data().longitude,
    }));
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};
export default db;