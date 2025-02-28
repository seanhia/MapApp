import { doc, getDoc, setDoc, updateDoc, collection, getDocs, query, where, deleteDoc, getCountFromServer, orderBy, serverTimestamp, limit } from 'firebase/firestore';
import db from '@/firestore'; 
import { getAuth, deleteUser as authDeleteUser  } from 'firebase/auth';
import { User, userSubcollections as subcollections, Leaderboard } from './types';
import { Timestamp } from 'firebase/firestore';


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
 * Fetch a user's data by their UID.
 * @param {string} id - The UID of the user to fetch.
 * @returns {Promise<User | null>} User data or null if the user doesn't exist.
 */
export const fetchUserByUID = async (id: string): Promise<User | null> => {
  try {
    const userDocRef = doc(db, 'users', id);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      console.error(`No user found with UID: ${id}`);
      return null;
    }

    return { id, ...userDocSnap.data() } as User;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};


/**
 * Write or update user data in Firestore.
 * @param {User} user - The user data to write.
 * @returns {Promise<void>}
 */
export const writeUserData = async (user: User): Promise<void> => {
  try {
    const userDocRef = doc(db, 'users', user.id);
    await setDoc(userDocRef, user, { merge: true });
    console.log('User data successfully written/updated!');
  } catch (error) {
    console.error('Error writing user data:', error);
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
  const usersSorted = query(collectionRef, orderBy("points", 'desc'), limit(4));
  const topPoints = await getDocs(usersSorted);
  const people = topPoints.docs.map(doc => ({ id: doc.id, ...doc.data() } as Leaderboard));
  return people
  
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

    // Delete all friendship documents found
    const deleteFriendships = friendshipDocs.map(friendshipDoc => deleteDoc(friendshipDoc.ref));
    await Promise.all(deleteFriendships);
    console.log(`All friendships associated with user ${uid} deleted.`);

 
    // Delete user from Firebase Authentication
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
