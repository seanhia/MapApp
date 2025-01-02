 import { getDocs, query, where, collection } from 'firebase/firestore';
 import db from '@/firestore';
 import { fetchCurrentUser } from './UserDataService';

const PendingQuery = async () => {
    try {
        const currentUser = await fetchCurrentUser();
        if (!currentUser) {
            throw new Error('No user is currently signed in!');
        }

    const friendshipsRef = collection(db, 'friendships');

    const pendingQ1 = query(friendshipsRef, where('status', '==', 'pending'), where('user1', '==', currentUser.uid));
    const pendingQ2 = query(friendshipsRef, where('status', '==', 'pending'), where('user2', '==', currentUser.uid));

    const [pendingSnapshot1, pendingSnapshot2] = await Promise.all([getDocs(pendingQ1), getDocs(pendingQ2)]);

    const pending: { id: string; friendId: string, friendUsername: string}[] = [];
    pendingSnapshot1.forEach((doc) => pending.push({ id: doc.id, friendId: doc.data().user2, friendUsername: doc.data().username2 }));
    pendingSnapshot2.forEach((doc) => pending.push({ id: doc.id, friendId: doc.data().user1, friendUsername: doc.data().username1 }));
    
    return pending; 
    
    } catch (error) {
        console.error('Error fetching pending requests:', error);
        return [];
    }
};

export default PendingQuery;