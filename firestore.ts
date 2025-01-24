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

// Save location

interface Location {
  latitude: number;
  longitude: number;
  description: string;
}

export async function saveLocation(
  userId: string,
  latitude: number,
  longitude: number,
  description: string
): Promise<void> {
  try {
    const locationId = `${latitude}_${longitude}_${Date.now()}`;
    const locationRef = doc(db, `users/${userId}/locations/${locationId}`);


    await setDoc(locationRef, {
      latitude,
      longitude,
      description,
      timestamp: serverTimestamp(),
    });

    console.log("Location saved successfully!");
  } catch (error) {
    console.error("Error saving location:", error);
    throw error;
  }
};

export async function fetchLocations(userId: string): Promise<Location[]> {
  try {
    const locationRef = collection(db, "users", userId, "locations");
    const snapshot = await getDocs(locationRef);

    return snapshot.docs.map((doc) => ({
      latitude: doc.data().latitude,
      longitude: doc.data().longitude,
      description: doc.data().description,
    }));
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};
export default db;