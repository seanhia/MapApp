import { getDocs, query, where, collection } from 'firebase/firestore';
import db from '@/firestore';
import { fetchCurrentUser, fetchUserByUID } from './UserDataService';
import { User, Friend } from '@/data/types'
import convertToDate from '@/app/utils/convertToDate';
import { useProfileImage } from '@/hooks/useProfileImage';

/**
    * Fetches the current user's "approved" friends from Firestore.
    * @returns {Promise<Friend[]>} A promise that resolves to an array of friends.
    * @throws {Error} If no user is currently signed in or if there is an error fetching friends.
    * First checks if the user is signed in, then queries the 'friendships' collection for approved friendships.
 */
export const FriendQuery = async () => {
    try {
        const currentUser = await fetchCurrentUser();
        if (!currentUser) {
            throw new Error('No user is currently signed in!');
        }

        const friendshipsRef = collection(db, 'friendships');

        const approvedQ1 = query(friendshipsRef, where('status', '==', 'approved'), where('user1', '==', currentUser.id));
        const approvedQ2 = query(friendshipsRef, where('status', '==', 'approved'), where('user2', '==', currentUser.id));

        const [querySnapshot1, querySnapshot2] = await Promise.all([getDocs(approvedQ1), getDocs(approvedQ2)]);

        const friends: Friend[] = [];
        querySnapshot1.forEach((doc) => friends.push({ 
            id: doc.id, friendId: doc.data().user2, friendUsername: doc.data().username2, 
            createdAt: doc.data().createdAt, status: doc.data().status
            
        }));
        querySnapshot2.forEach((doc) => friends.push({ 
            id: doc.id, friendId: doc.data().user1, friendUsername: doc.data().username1,
            createdAt: convertToDate(doc.data().createdAt), status: doc.data().status
        }));
        console.log('Friends:', friends);

        return friends;

    } catch (error) {
        console.error('Error fetching friends:', error);
        return [];
    }
};

export const PendingQuery = async () => {
    try {
        const currentUser = await fetchCurrentUser();
        if (!currentUser) {
            throw new Error('No user is currently signed in!');
        }

    const friendshipsRef = collection(db, 'friendships');

    const pendingQ1 = query(friendshipsRef, where('status', '==', 'pending'), where('user2', '==', currentUser.id)); // The user that has been requested 

    const [pendingSnapshot1] = await Promise.all([getDocs(pendingQ1)]);

    const pending: Friend[] = [];
    pendingSnapshot1.forEach((doc) => pending.push({ 
        id: doc.id, friendId: doc.data().user1, friendUsername: doc.data().username1, 
        createdAt: doc.data().createdAt, status: doc.data().status
    }));
    
    return pending; 
    
    } catch (error) {
        console.error('Error fetching pending requests:', error);
        return [];
    }
};


export const fetchFriendCount = async (friend: User | null): Promise<string> => {

    try {
        // const currentUser = await fetchCurrentUser();
        if (!friend) {
            throw new Error('No user is currently signed in!');
        }  
       
        const friendshipsRef = collection(db, 'friendships');
        const countQuery1 = query(friendshipsRef, where('status', '==', 'approved'), where('user1', '==', friend.id));
        const countQuery2 = query(friendshipsRef, where('status', '==', 'approved'), where('user2', '==', friend.id));

        const [querySnapshot1, querySnapshot2] = await Promise.all([getDocs(countQuery1), getDocs(countQuery2)]);
        const friendCount = querySnapshot1.size + querySnapshot2.size;
        return friendCount.toString();

    } catch (error) {
        console.error('Error fetching friends:', error);
        return '0';
    }
}   
