//import firestore from '@react-native-firebase/firestore';
import { getFirestore, addDoc, collection, getDocs, getDoc, setDoc, doc, deleteDoc, increment, updateDoc } from 'firebase/firestore';
import app from './firebase'
import { query, orderBy, limit } from "firebase/firestore";
import { haversineDistance, getCityCountry } from "./app/utils/geolocation";
import { updatePoints } from './data/UserDataService';
import { Stats } from './data/types';

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
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting documents: ', error);
    throw error;
  }
};

// Update a document
export const updateDocument = async (collectionName: string, docId: string, data: any) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await setDoc(docRef, data, { merge: true }); // Merge updates the fields without overwriting the whole document
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
): Promise<{ latitude: number; longitude: number }[]> => {
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

export async function saveStats(userId: string) {
  const CityCountry = await getCityCountry();
  if (!CityCountry) return;

  const CityCountryRef = collection(db, `users/${userId}/stats`);
  const statsDocRef = doc(CityCountryRef, `${CityCountry.city}_${CityCountry.country}`);

  const CountryRef = collection(db, `users/${userId}/countries`);
  const countryDocRef = doc(CountryRef, `${CityCountry.country}`);

  const countrySnapshot = await getDoc(countryDocRef); // check if the country has been visited already 

  if (!countrySnapshot.exists()){ //add country if it doesn;t exits 
    await setDoc(countryDocRef,{
      country: CityCountry.country,
      points:100 // 100 points for every new country 
    });

    console.log(`New country added: ${CityCountry.country} - Awarded 100 points`);

    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef); // refrence user doc 

    if(userDoc.exists()){
      const currentPoints = userDoc.data().points || 0; // get current points id user doesn't have any assign 0 
      const updatePoints = currentPoints + 100;

      await updateDoc(userDocRef, {
        points: updatePoints, //update points 
      });
      console.log(`User points updated: +100`);
    } else {
      console.error(`User document with id ${userId} does not exist.`)
    }

  } else {
    console.log (`Country already exists: ${CityCountry.country}. Points not added.`);
  }

  const locationSnapshot = await getDoc(statsDocRef);// check if city_country already exists 

  if (!locationSnapshot.exists()) { //add location if it doesn't exists 
    await setDoc(statsDocRef, {
      cities: CityCountry.city,
      countries: CityCountry.country,
      points: 50 // 50 points for new city 
    }, { merge: true });

    console.log(`New location added: ${CityCountry.city}, ${CityCountry.country} - Awarded 50 points`);


    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef); // refrence user doc 

    if (userDoc.exists()) {
      const currentPoints = userDoc.data().points || 0; // get current points 
      const updatePoints = currentPoints + 50;

      await updateDoc(userDocRef, {
        points: updatePoints, //update 
      });

      console.log(`User points updated: +50`);
    } else {
      console.error(`User document with id ${userId} does not exist.`);
    }

  } else {
    console.log(`Location already exists: ${CityCountry.city}, ${CityCountry.country}. Points not added.`);
  }

}





export async function getStats(userId: string): Promise<{ cities: string; countries: string }[]> {
  const userLocationRef = collection(db, `users/${userId}/stats`); // access stats data from user
  const locationSnapshot = await getDocs(userLocationRef); // get stats docs

  return locationSnapshot.docs.map((doc) => doc.data() as { cities: string; countries: string });
}

export async function getAchievementData(userId: string): Promise<{
  distanceTraveled: number;
  cities: string[];
  countries: string[];
}> {
  const userDocSnap = await getDoc(doc(db, "users", userId));
  const totalDistance = userDocSnap.data()?.totalDistance || 0;

  const statsDocs = await getStats(userId);

  const cities = statsDocs.map(doc => doc.cities);
  const countries = statsDocs.map(doc => doc.countries);

  return {
    distanceTraveled: totalDistance,
    cities,
    countries,
  };
}