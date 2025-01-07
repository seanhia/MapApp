 import { getDocs, query, where, collection } from 'firebase/firestore';
 import db from '@/firestore';
 import { fetchCurrentUser } from './UserDataService';

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

        const friends: { id: string; friendId: string, friendUsername: string}[] = [];
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

    const pendingQ1 = query(friendshipsRef, where('status', '==', 'pending'), where('user2', '==', currentUser.id));
    // const pendingQ2 = query(friendshipsRef, where('status', '==', 'pending'), where('user2', '==', currentUser.id));

    const [pendingSnapshot1] = await Promise.all([getDocs(pendingQ1)]);

    const pending: { id: string; friendId: string, friendUsername: string}[] = [];
    pendingSnapshot1.forEach((doc) => pending.push({ id: doc.id, friendId: doc.data().user1, friendUsername: doc.data().username1 }));
    // pendingSnapshot2.forEach((doc) => pending.push({ id: doc.id, friendId: doc.data().user1, friendUsername: doc.data().username1 }));
    
    return pending; 
    
    } catch (error) {
        console.error('Error fetching pending requests:', error);
        return [];
    }
};

// const BoilerPlate = async () => {
//     // Output all friendship documents in the Console

//     try {
//         const currentUser = await fetchCurrentUser();
//         if (!currentUser) {
//             throw new Error('No user is currently signed in!');
//         }
//         const friendshipsRef = collection(db, 'friendships');
//         const user = fetchCurrentUser();
//         console.log('Fetching friends for user:', user.id);
//         const FetchDocs = await getDocs(friendshipsRef);
//         console.log('Friends Collection', FetchDocs.docs)
//         FetchDocs.docs.forEach(doc => { console.log(doc.id, '=>', doc.data()) });
//     } catch (error) {
//         console.error('Error fetching friends:', error);    
//     }    
// }