import { doc, getDoc, collection, setDoc, getDocs, query, where, updateDoc, deleteDoc } from 'firebase/firestore';
import db from '@/firestore';
import { fetchCurrentUser, fetchUserByUID } from '@/data/UserDataService'
import { User, status, Friend } from '@/data/types';
import convertToDate from '@/app/utils/convertToDate';


{/** CREATE */}

export const createFriendship = async (friend: User) => {
    try {
        const currentUser = await fetchCurrentUser(); 
        
        if (!currentUser) {
            throw new Error('No user is currently signed in!');
        } 
        const frienshipExists = await existingFriendshipQuery(currentUser, friend);
        if (frienshipExists == true) {
            return;
        }
        // Data for new frienship document 
        const data = {
            user1: currentUser.id, //currentUser.uid,
            user2: friend.id,
            status: 'pending', // pending, approved, rejected
            username1: currentUser.username || null, 
            username2: friend.username, 
            createdAt: convertToDate(new Date()), // Use the current date and time
        }
        const friendshipId = [currentUser.id, friend.id].sort().join("_");
        const newFriendshipRef = doc(db, 'friendships', friendshipId);
        
        // Write the data into Firestore
        await setDoc(newFriendshipRef, data);
        alert('Friend Request Sent!')
        console.log('Friendship successfully initiated!');

    } catch (error) {
        console.error('Error creating friendship:', error);
    }
}; 


{/** UTIL */}

const existingFriendshipQuery = async (currentUser: User, friend: User) => {
    // Check if a friendship already exists between the two users
    const existingFriendshipQuery = query(
        collection(db, 'friendships'),
        where('status', 'in', status),
        where('user1', 'in', [currentUser.id, friend.id]),
        where('user2', 'in', [currentUser.id, friend.id])
    ); 
                                                                                                                  
    const existingFriendshipSnapshot = await getDocs(existingFriendshipQuery);

    if (!existingFriendshipSnapshot.empty) {
        const friendRef = existingFriendshipSnapshot.docs[0]
        if (friendRef.data().status === status[1]) {
            alert('You are already friends!')
            console.log('You are already friends:', friendRef.id);
            return true;
        }
        if (friendRef.data().status === status[0]) {
            alert('Friend request already sent!')
            console.log('Friend request already sent:', friendRef.id);
            return true;
        }
        return; 
    }
    if (currentUser.id === friend.id) {
        alert('You cannot add yourself as a friend!');
        console.error('You cannot add yourself as a friend!');
        return true;
    }
    return false;
}

{/** READ (GET | LIST) --> QUERY */}

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

{/** UPDATE */}

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


{/** DELETE */}

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

 