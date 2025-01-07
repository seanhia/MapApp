import { doc, getDoc, collection, setDoc, getDocs, query, where, updateDoc, deleteDoc } from 'firebase/firestore';
// import PendingQuery from '@/assets/data/PendingQuery';
import db from '@/firestore';
import { getAuth } from 'firebase/auth';
import { fetchUserByUID } from '@/data/UserDataService'

export const handleAccept = async (friendshipId: string) => {
    console.log('Accepted friend request from friendshipId:', friendshipId);
    try {
    await AcceptFriendship(friendshipId); // Update friendship status in Firestore
    // Optionally, refresh the pending requests after accepting
    // Update state to remove the accepted request from the UI
    } catch (error) {
    console.error('Error handling friend acceptance:', error);
    }
};

export const handleDeny = async (friendshipId: string) => {
    console.log('Denied friend request from friendshipId:', friendshipId);
    try {
      // Handle deny logic (e.g., remove the friendship request or change the status)
        await DenyFriendship(friendshipId); 
    } catch (error) {
      console.error('Error handling friend denial:', error);
    }
  };


export const createFriendship = async (userId: string , username: string) => {
    try {
        // Auth instance to get the current user's ID (optional)
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) {
            throw new Error('No user is currently signed in!');
        } 
        const user = await fetchUserByUID(currentUser.uid)
        if (!user) throw new Error('Unable to fetch the current user details.');


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
            username1: user.username || null, 
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

const AcceptFriendship = async (id: string) => {
    const data = {
        status: 'approved',
    };

    try {
        const friendshipDoc = doc(db, 'friendships', id);
        
        await updateDoc(friendshipDoc, data);
        console.log('Friendship accepted!'); 

    } catch (error) {
        console.error('Error accepting friendship:', error);
    }  
};

const DenyFriendship = async (id: string) => {
    try {
        const friendshipDoc = doc(db, 'friendships', id);
        
        await deleteDoc(friendshipDoc);
        console.log('Friendship denied!'); 

    } catch (error) {
        console.error('Error denying friendship:', error);
    }  
}

 