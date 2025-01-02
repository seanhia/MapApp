import { doc, getDoc, collection, setDoc, getDocs, query, where } from 'firebase/firestore';
import db from '@/firestore';
import { getAuth } from 'firebase/auth';

const createFriendship = async (userId: string , username: string) => {
  try {
    // Auth instance to get the current user's ID (optional)
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error('No user is currently signed in!');
    }
    
  const friendshipsRef = collection(db, 'friendships');

  // Check if a friendship already exists between the two users
  const existingFriendshipQuery = query(
    friendshipsRef, 
    where('status', 'in', ['approved', 'pending', 'rejected']),
    where('user1', 'in', [currentUser.uid, userId]),
    where('user2', 'in', [currentUser.uid, userId])
  ); 

  const existingFriendshipSnapshot = await getDocs(existingFriendshipQuery);

  if (!existingFriendshipSnapshot.empty) {
    console.log('Friendship already exists:', existingFriendshipSnapshot.docs[0].id);
    return;
  }
  if (currentUser.uid === userId) {
    console.error('You cannot add yourself as a friend!');
    return;
  }
  

  // Data for new frienship document 
  const data = {
    user1: currentUser.uid, //currentUser.uid,
    user2: userId,
    status: 'pending', // pending, approved, rejected
    username1: currentUser.displayName || 'Display Name Unavailable', 
    username2: username, 
    created_at: new Date()
  }

  const newFriendshipRef = doc(collection(db, 'friendships'));

    // Write the data into Firestore
    await setDoc(newFriendshipRef, data);

    console.log('Friendship successfully initiated!');
  } catch (error) {
    console.error('Error creating friendship:', error);
  }
}; 


export default createFriendship;