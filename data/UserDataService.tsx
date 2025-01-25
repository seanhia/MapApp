import { doc, getDoc, setDoc, updateDoc, collection, getDocs, query, where } from 'firebase/firestore';
import db from '@/firestore'; 
import { getAuth } from 'firebase/auth';
import { User } from './types';

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

  return { id: currentUser.uid, ...userDocSnap.data() } as User;
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
        email: data.email,
        created_at: data.createdAt?.toDate(),
      } as User;
    });
    return users; 
  } catch (error) {
    console.error('Error fetching all users:', error);
    return [];
  }
}
