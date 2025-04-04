import { doc, getDoc, setDoc, updateDoc, collection, getDocs, query, where, deleteDoc, getCountFromServer, orderBy, serverTimestamp, limit } from 'firebase/firestore';
import db from '@/firestore'; 
import { getAuth, deleteUser as authDeleteUser  } from 'firebase/auth';
import { User, userSubcollections as subcollections, Leaderboard, FavoriteLoc } from './types';
import { Timestamp } from 'firebase/firestore';
import {FriendQueryBasedOnUserId, fetchFriendCount} from './Friendship'


/**
 * Type guard to check if data is of type User
 */
const isUser = (data: any): data is User => {
  return (
    typeof data === 'object' 
    && data !== null 
    && 'id' in data 
    && 'username' in data
    && 'firstName' in data
  );
};

/**
* Type guard to check if data is of type Leaderboard
*/
const isLeaderboard = (data: any): data is Leaderboard => {
  return (
    typeof data === 'object' 
    && data !== null
    && 'id' in data 
    && 'points' in data
    && 'ranking' in data 
  );
};

const isFavoriteLoc = (data: any): data is FavoriteLoc => {
  return (
    typeof data === 'object'
    && data != null 
    && 'id' in data
    && 'latitude' in data
    && 'longitude' in data
    && 'name' in data 
  )
}


/**
 * Fetch the current user's data.
 * @returns {Promise<User | null>} User data or null if the user doesn't exist.
 */
export const fetchCurrentUser = async (): Promise<User | null> => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    console.error('No user is currently signed in!');
    return null;
  }

  const userDocRef = doc(db, 'users', currentUser.uid);
  const userDocSnap = await getDoc(userDocRef);

  if (!userDocSnap.exists()) {
    console.error('User document does not exist in Firestore!');
    return null;
  }

  const userData = userDocSnap.data();
  const createdAt = userData.createdAt instanceof Timestamp 
  ? userData.createdAt.toDate() //if Timestamp change to Date format 
  : userData.createdAt;


  return { id: currentUser.uid, ...userData, createdAt: createdAt || new Date()} as User;
};



/**
   * Fetch the current user's leaderboard data.
   * @returns {Promise<Leaderboard | null>} Leaderboard data or null if the user doesn't exist.
   * @throws {Error} If no user is currently signed in or if the user document does not exist.
   * @description This function retrieves the current user's leaderboard data from Firestore.
   */
export const fetchCurrentUserLeaderboard = async (): Promise<Leaderboard | null> => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    console.error('No user is currently signed in!');
    return null;
  }

  const userDocRef = doc(db, 'leaderboard_entry', currentUser.uid);
  const userDocSnap = await getDoc(userDocRef);

  if (!userDocSnap.exists()) {
    console.error('User document does not exist in Firestore!');
    return null;
  }
  const userData = userDocSnap.data();

  return { id: currentUser.uid, ...userData} as Leaderboard;
};


export const getCitiesSize = async (id: string) => {
  try {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const statsRef = collection(db, 'users', id, 'stats'); 
    const statsSnap = await getCountFromServer(statsRef);
    const size = statsSnap.data().count;
    return size;


  } catch (error) {
    console.error('getCites: ', error)
    return null; 
  }
}
/**
 * Fetch users Favorite Location List from favorites subcollection
 * @returns {}
 * @param {User}
 */
export const fetchUsersFavLocation = async (id: string): Promise<FavoriteLoc[] | null> => {
  try {
    const favLocactionsRef = collection(db, 'users', id, 'favorite'); 
    const favLocationsSnap = await getDocs(favLocactionsRef)
    const favList =  [{}]
    favLocationsSnap.forEach((location) => {
      favList.push(location.data())
    })
    return favList as FavoriteLoc[]
  } catch (error) {
    console.error('fetchUsersFavLocation: ', error)
    return null; 
  }
}

/**
 * Fetch a user's data by their UID.
 * @param {string} id - The UID of the user to fetch.
 * @returns {Promise<User | null>} User data or null if the user doesn't exist.
 */
export const fetchUserByUID = async (id: string): Promise<User | null> => {
  try {
    const userDocRef = doc(db, 'users', id);
    const userDocSnap = await getDoc(userDocRef);
    console.log("fetching user id: ",userDocSnap.data())

    if (!userDocSnap.exists()) {
      console.error(`No user found with UID: ${id}`);
      return null;
    }

    // Fetch the user's data
    const userData = userDocSnap.data();
     // Convert the `createdAt` field if it's a Timestamp, else return as is
     if (userData.createdAt instanceof Timestamp) {
      userData.createdAt = userData.createdAt.toDate();
    }

    return { id, ...userData} as User;

  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};


/**
 * Write or update data in Firestore.
 * @param {User | Leaderboard} user - The data to write.
 * @returns {Promise<void>}
 */
export const writeData = async (data: User | Leaderboard | FavoriteLoc): Promise<void> => {
  var collection_name = ''
  try {
    

    if (isUser(data)){
      collection_name = 'users'
    } else if (isLeaderboard(data)) {
      collection_name = 'leaderboard_entry'
    } else if (isFavoriteLoc(data)) {
      collection_name = 'favorite'
    } else {
      throw new Error('Invalid data type. Expected User or Leaderboard.');
    }
    console.log('Detected data type:', collection_name);

    const docRef = doc(db, collection_name, data.id);
    await setDoc(docRef, data, { merge: true });
  } catch (error) {
    console.error(`Error writing ${collection_name} data:`, error);
  }
};


/**
 * Query users based on specific criteria.
 * @param {string} field - The field to query.
 * @param {string | number | boolean} value - The value to match.
 * @returns {Promise<User[]>} Array of users matching the criteria.
 */
export const queryUsers = async (field: string, value: string | number | boolean): Promise<User[]> => {
  try {
    const usersCollectionRef = collection(db, 'users');
    const userQuery = query(usersCollectionRef, where(field, '==', value));
    const querySnapshot = await getDocs(userQuery);

    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
  } catch (error) {
    console.error('Error querying users:', error);
    return [];
  }
};

/**
 * Query all users in Firestore.
 */
export const fetchAllUsers = async (): Promise<User[]> => {
  try {
    const usersCollectionRef = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCollectionRef);

    const users = usersSnapshot.docs.map(doc => {
      const data = doc.data();

  
      return {
        id: doc.id,
        username: data.username,
        eMail: data.email,
        createdAt: data.createdAt ? ( data.createdAt instanceof Timestamp ? data.createdAt.toDate() : data.createdAt) 
        : new Date(),
      } as User;
    });
    return users; 
  } catch (error) {
    console.error('Error fetching all users:', error);
    return [];
  }
}

export async function getCollectionSize(collectionPath: string) {
  const collectionRef = collection(db, collectionPath);
  const snapshot = await getCountFromServer(collectionRef);
  const size = snapshot.data().count;
  return size + 1;
}

export const getTopFourUsers = async () => {
  const collectionRef = collection(db, 'leaderboard_entry');
  const usersSorted = query(collectionRef, orderBy("points", 'desc'), limit(10));
  const topPoints = await getDocs(usersSorted);
  const people = topPoints.docs.map(doc => ({ id: doc.id, ...doc.data() } as Leaderboard));
  return people
  
}

export const getFriendsRank = async () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const friends = await FriendQueryBasedOnUserId(currentUser.uid);
  const colSize = friends.length
  const friendsList = []
  for (var i = 0; i < colSize; i++){
    const userDocRef = doc(db, 'leaderboard_entry', friends[i].friendId);
    console.log(friends[i].friendId)
    const pleaseWork = await getDoc(userDocRef)
    friendsList.push(pleaseWork.data())
    }
  return friendsList as Leaderboard[];
}


  
export async function rankUsers() {
  const collectionRef = collection(db, 'leaderboard_entry');
  const usersSorted = query(collectionRef, orderBy("points", 'desc'));
  const topPoints = await getDocs(usersSorted);
  const pleaseGod = topPoints.docs.map(doc => ({ id: doc.id, ...doc.data() } as Leaderboard));
  const colSize = await getCollectionSize('leaderboard_entry');

  for (var i = 0; i < colSize-1; i++){
    const userDocRef = doc(db, 'leaderboard_entry', pleaseGod[i].id);
    await updateDoc(userDocRef, {ranking: i+1,
                                 last_updated: serverTimestamp()
    })
  }
}


/**
 * Delete User and all associated friendships, including Firebase Authentication account
 * @param {string} uid - user id of the deleted user 
 * @return {void}
 */
export const deleteUser = async (uid: string) => {
  try {
    const auth = getAuth(); 

     // Delete all subcollections before deleting the user document
     await deleteSubcollections(uid);

    // Reference to the user's document
    const userDocRef = doc(db, 'users', uid);

    // Delete the user document
    await deleteDoc(userDocRef);
    console.log(`User ${uid} deleted successfully.`);

    // Query friendships where the user is involved
    const friendshipsRef = collection(db, 'friendships');
    const friendshipsQuery = query(friendshipsRef, where('user1', '==', uid));
    const friendshipsQuery2 = query(friendshipsRef, where('user2', '==', uid));

    const [friendshipsSnap1, friendshipsSnap2] = await Promise.all([
      getDocs(friendshipsQuery),
      getDocs(friendshipsQuery2),
    ]);

    const friendshipDocs = [...friendshipsSnap1.docs, ...friendshipsSnap2.docs];

    const deleteFriendships = friendshipDocs.map(friendshipDoc => deleteDoc(friendshipDoc.ref));
    await Promise.all(deleteFriendships);
    console.log(`All friendships associated with user ${uid} deleted.`);

     const user = auth.currentUser;
    if (user && user.uid === uid) {
      await authDeleteUser(user);
      console.log(`User ${uid} deleted from Firebase Authentication.`);
    } else {
      console.warn(`User ${uid} not authenticated or different user is signed in.`);
    }

  } catch (error) {
    console.error(`Error deleting user ${uid} and associated data:`, error);
  }
};

/**
 * Recursively deletes all subcollections for a given document.
 * @param {string} userId - The user ID whose subcollections should be deleted.
 */
const deleteSubcollections = async (userId: string) => {
  const userDocRef = doc(db, 'users', userId);

  for (const subcollection of subcollections) {
    const subcollectionRef = collection(userDocRef, subcollection);
    const subDocsSnap = await getDocs(subcollectionRef);

    const deletePromises = subDocsSnap.docs.map((subDoc) => deleteDoc(subDoc.ref));
    await Promise.all(deletePromises);
    console.log(`Deleted all documents in subcollection: ${subcollection}`);
  }
};

/**
 * Checks if a user exists in Firestore.
 * @param {string} id - The user ID to check.
 * @return {Promise<boolean>} - Returns true if the user exists, false otherwise.
 */
const userExists = async (id: string): Promise<boolean> => {
  try {
    const userDocRef = doc(db, 'users', id);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      console.error(`No user found with UID: ${id}`);
      return false;
    } else { 
      return true
    }
  } catch (error) {
    console.error(`Error checking user existence:`, error);
    return false;
  }
}
