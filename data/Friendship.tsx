import { doc, getDoc, collection, setDoc, getDocs, query, where, updateDoc, deleteDoc } from 'firebase/firestore';
// import PendingQuery from '@/assets/data/PendingQuery';
import db from '@/firestore';
import { getAuth } from 'firebase/auth';
import { fetchUserByUID } from '@/data/UserDataService'
import { User, status } from '@/data/types';
import convertToDate from '@/app/utils/convertToDate';

export const createFriendship = async (friend: User) => {
    try {
        // Auth instance to get the current user's ID (optional)
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) {
            throw new Error('No user is currently signed in!');
        } 
        const user = await fetchUserByUID(currentUser.uid)
        if (!user) throw new Error('Unable to fetch the current user details.');



        // Check if a friendship already exists between the two users
        const existingFriendshipQuery = query(
            collection(db, 'friendships'),
            where('status', 'in', status),
            where('user1', 'in', [currentUser.uid, friend.id]),
            where('user2', 'in', [currentUser.uid, friend.id])
        ); 
                                                                                                                      
        const existingFriendshipSnapshot = await getDocs(existingFriendshipQuery);

        if (!existingFriendshipSnapshot.empty) {
            const friendRef = existingFriendshipSnapshot.docs[0]
            if (friendRef.data().status === status[1]) {
                alert('You are already friends!')
                console.log('You are already friends:', friendRef.id);
                return;
            }
            if (friendRef.data().status === status[2]) {
                alert('Friend request already sent!')
                console.log('Friend request already sent:', friendRef.id);
                return;
            }
            return; 
        }
        if (currentUser.uid === friend.id) {
            alert('You cannot add yourself as a friend!');
            console.error('You cannot add yourself as a friend!');
            return;
        }
        // Data for new frienship document 
        const data = {
            user1: currentUser.uid, //currentUser.uid,
            user2: friend.id,
            status: 'pending', // pending, approved, rejected
            username1: user.username || null, 
            username2: friend.username, 
            createdAt: convertToDate(new Date()), // Use the current date and time
        }
        const friendshipId = [currentUser.uid, friend.id].sort().join("_");
        const newFriendshipRef = doc(db, 'friendships', friendshipId);
        
        // Write the data into Firestore
        await setDoc(newFriendshipRef, data);
        alert('Friend Request Sent!')
        console.log('Friendship successfully initiated!');

    } catch (error) {
        console.error('Error creating friendship:', error);
    }
}; 

export const AcceptFriendship = async (id: string) => {
    const data = {
        status: status[1], // approved
    };

    try {
        const friendshipDoc = doc(db, 'friendships', id);
        
        await updateDoc(friendshipDoc, data);
        console.log('Friendship accepted!'); 

    } catch (error) {
        console.error('Error accepting friendship:', error);
    }  
};

/**
* Deletes Friendship Document
* @param {string} id - Friendship Document ID
* @returns {void}
*/
export const DeleteFriendship = async (id: string) => {
    try {
        const friendshipDoc = doc(db, 'friendships', id);
        
        await deleteDoc(friendshipDoc);
        console.log('Friendship successfully delelted!'); 

    } catch (error) {
        console.error('Error denying friendship:', error);
    }  
}

 