import { doc, getDoc, collection, setDoc, getDocs, query, where, updateDoc, deleteDoc } from 'firebase/firestore';
import db from '@/firestore';
import { fetchCurrentUser, fetchUserByUID } from '@/data/UserDataService'
import { User, status, Friend } from '@/data/types';
import convertToDate from '@/app/utils/convertToDate';


const collection_name = 'Friendships'
const friendshipsRef = collection(db, collection_name)


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
        friendshipsRef,
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

/**
 * Query to fetch all the 'friendships' documents a user is apart of
 * @param user 
 * @return 
 */
export const FriendshipQuery = async () => {
    try {
        const currentUser = await fetchCurrentUser(); 
        
        if (!currentUser) {
            throw new Error('No user is currently signed in!');
        } 
         // Query friendships where the user is either user1 or user2
         const q = query(friendshipsRef, where('user1', '==', currentUser.id));
         const q2 = query(friendshipsRef, where('user2', '==', currentUser.id));
 
         // Fetch documents for both cases
         const querySnapshot1 = await getDocs(q);
         const querySnapshot2 = await getDocs(q2);
 
         // Merge results
         const allFriendships = [...querySnapshot1.docs, ...querySnapshot2.docs];
         return allFriendships 
    } catch (e) {
        console.error("Could not fetch snapshot of all Users 'Frienships' docs", e)
        return []
    }
}

/**
 * Based on the current user, fetch all the 'approved' friendship documents associated with the user 
 * @returns Friend[] | [] 
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

/**
 *
 * Based on the current user, fetch all the 'pending' friendship documents associated with the user
 * @return Friend[] | []
 */
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

/**
 * Queires the approved friendship documents associated with the User and returns the sum = Friend count 
 * @param friend 
 * @returns string  
 */
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

/**
 * Update friendship username of the user in each document they appear in
 * @props User
 * 
 */
export const updateFriendshipUsername = async (user: User) => {
    try {
        const allFriendships = await FriendshipQuery(user)
   
        for (const docSnap of allFriendships) {
            const friendshipDocRef = doc(db, collection_name, docSnap.id)
            const friendshipData = docSnap.data(); 

            const updatedFrienship = {
                ...friendshipData, 
                username1: friendshipData.User.user1 === user.id ? user.username : friendshipData.User.username1,
                username2: friendshipData.User.user2 === user.id ? user.username : friendshipData.User.username2 
            };

            await updateDoc(friendshipDocRef, updatedFrienship);
        } 

        console.log(`Successfully updated ${allFriendships.length} friendships for user ${user.id}`);
    
    } catch (error) {
       console.error('Error updating friendship documents:', error);
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
};
/**
 * friend query by userId
 * @param userId 
 * @returns list of friends 
 */
export const FriendQueryBasedOnUserId = async (userId: string) => {
    try {
        const friendshipsRef = collection(db, 'friendships');

        const approvedQ1 = query(friendshipsRef, where('status', '==', 'approved'), where('user1', '==', userId));
        const approvedQ2 = query(friendshipsRef, where('status', '==', 'approved'), where('user2', '==', userId));

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
/**
 * send notification to user's friends when they post 
 * @param userId 
 * @param postId 
 */
 export const sendPostNotifications = async (userId: string) =>{
    try{
        
        const user: User | null = await fetchUserByUID(userId);
        if (!user) {
            console.error("User not found");
            return;
        }
    
        const friends = await FriendQueryBasedOnUserId(userId); //fetch friends list 
        if (!friends || friends.length === 0) {
            console.log("No friends found.");
            return;
        }
        const notificationsRef = collection(db, 'notifications');//create notifictaions collection

        const timestamp = new Date().toISOString();

        for (const friend of friends) { //iterate through friends 
            const notificationData = {
                friendId: friend.friendId,
                userId: userId,
                message: `View @${user.username} recent trip!`,
                createdAt: convertToDate(new Date()),
                read: false
            };
            const notificationDocRef = doc( 
                notificationsRef, 
                friend.friendId, 
                userId, 
                timestamp
            );
            
            await setDoc(notificationDocRef, notificationData); 
            console.log('Notification', 'Successfully created.');
        }
        
    } catch (error){
        console.error('Error creating notification for the post', error);
    }


 }; 

 export const fetchNotifications = async (userId: string) =>{

 };