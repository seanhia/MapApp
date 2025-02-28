//import firestore from '@react-native-firebase/firestore';
import {getFirestore, addDoc, collection, getDocs, setDoc, doc, deleteDoc, increment, updateDoc} from 'firebase/firestore';
import app from './firebase'
import { query, orderBy, limit } from "firebase/firestore";
import { haversineDistance } from "./app/utils/geolocation";
//import { getCityCountry } from "./app/utils/stats";

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

     // Fetch last saved location to compute distance
     const lastLocation = await getLastLocation(userId);
     let distanceFromLast = 0;
 
     if (lastLocation) {
       distanceFromLast = haversineDistance(
         lastLocation.latitude,
         lastLocation.longitude,
         latitude,
         longitude
       );
     }

    await addDoc(locationsRef, {
      latitude,
      longitude,
      timestamp: Date.now(),
      distanceFromLast,
    });
    console.log(`Saved location. Moved ${distanceFromLast} meters from the last saved location.`);
    
    //update total distance traveled for user
    await updateDoc(userDocRef, {
      totalDistance: increment(distanceFromLast),
    });
    console.log('added ${distanceFromLast} to user ${userId}');

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

// Function to fetch the last saved location for a user
const getLastLocation = async (userId: string) => {
  const userDocRef = doc(db, "users", userId);
  const locationsRef = collection(userDocRef, "locations");

  const q = query(locationsRef, orderBy("timestamp", "desc"), limit(1));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].data();
  }
  return null;
};

// export async function updateStats(userId: string) {
//   try{
//     const {uniqueCities, uniqueCountries} = await getCityCountry(userId);

//     const userStats = doc(db, `users/${userId}/stats/statsDocument`);
//     await setDoc(userStats, {
//       uniqueCities,
//       uniqueCountries,
//     });

//   console.log("User stats updated");
//   } catch(error){
//     console.error("User stats firebase failed", error);
//   }
// }

