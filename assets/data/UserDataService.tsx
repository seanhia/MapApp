import { doc, getDoc, setDoc, updateDoc, collection, getDocs, query, where } from 'firebase/firestore';
import db from '@/firestore'; 
import { getAuth } from 'firebase/auth';

export type User = {
  uid: string;
  displayName: string | null;
  email: string | null;
  createdAt?: Date;
};

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

  return { uid: currentUser.uid, ...userDocSnap.data() } as User;
};

/**
 * Fetch a user's data by their UID.
 * @param {string} uid - The UID of the user to fetch.
 * @returns {Promise<User | null>} User data or null if the user doesn't exist.
 */
export const fetchUserByUID = async (uid: string): Promise<User | null> => {
  try {
    const userDocRef = doc(db, 'users', uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      console.error(`No user found with UID: ${uid}`);
      return null;
    }

    return { uid, ...userDocSnap.data() } as User;
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
    const userDocRef = doc(db, 'users', user.uid);
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

    return querySnapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() } as User));
  } catch (error) {
    console.error('Error querying users:', error);
    return [];
  }
};
