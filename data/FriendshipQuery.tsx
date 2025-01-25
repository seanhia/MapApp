 import { getDocs, query, where, collection } from 'firebase/firestore';
 import db from '@/firestore';
 import { fetchCurrentUser } from './UserDataService';
 import { User } from '@/data/types'
 import { Friend } from '@/data/types'

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
        querySnapshot1.forEach((doc) => friends.push({ id: doc.id, friendId: doc.data().user2, friendUsername: doc.data().username2 }));
        querySnapshot2.forEach((doc) => friends.push({ id: doc.id, friendId: doc.data().user1, friendUsername: doc.data().username1 }));

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
    pendingSnapshot1.forEach((doc) => pending.push({ id: doc.id, friendId: doc.data().user1, friendUsername: doc.data().username1 }));
    
    return pending; 
    
    } catch (error) {
        console.error('Error fetching pending requests:', error);
        return [];
    }
};

export const fetchFriendCount = async (user: User): Promise<string | null> => {

    try {
        const currentUser = await fetchCurrentUser();
        if (!currentUser) {
            throw new Error('No user is currently signed in!');
        }  
       
        const friendRef = collection(db, 'friendships');
        const countQ = query(friendRef, where('status', '==', 'approved'), where('user1', '==', user.id));
        const [countSnapshot] = await Promise.all([getDocs(countQ)]);
        const friendCount = countSnapshot.size;
        return friendCount.toString();

    } catch (error) {
        console.error('Error fetching friends:', error);
        return null;
    }
}   
