import { doc, addDoc, getDoc, collection, setDoc, getDocs, query, orderBy, where, updateDoc, deleteDoc, serverTimestamp, onSnapshot, writeBatch } from 'firebase/firestore';
import db from '@/firestore';
import { fetchCurrentUser, fetchUserByUID } from '@/data/UserDataService'
import { User, status, Friend, Notification } from '@/data/types';
import convertToDate from '@/app/utils/convertToDate';
import Notifications from '@/app/screens/notifications';


const friendships_collection = 'friendships'
const friendshipsRef = collection(db, friendships_collection)


{/** CREATE */ }

export const createFriendship = async (friend: User) => {
    try {
        const currentUser = await fetchCurrentUser();

        if (!currentUser) {
            throw new Error('No user is currently signed in!');
        }
        const friendshipExists = await existingFriendshipQuery(currentUser, friend);
        if (friendshipExists[0] == true) {
            if (friendshipExists[1] == status[0]) {
                alert('Friend request already sent!')
                console.log('Friend request already sent:', friend.id);
            } else if (friendshipExists[1] == status[1]) {
                alert('You are already friends!')
                console.log('You are already friends:', friend.id);
            } else if (friendshipExists[1] == status[3]) {
                alert('You cannot add yourself as a friend!');
            }
            return false
        }
        // Data for new frienship document 
        const data = {
            user1: currentUser.id, //currentUser.uid,
            user2: friend.id,
            status: status[0], // pending, approved, rejected
            username1: currentUser.username || null,
            username2: friend.username,
            createdAt: convertToDate(new Date()), // Use the current date and time
        }
        const friendshipId = [currentUser.id, friend.id].sort().join("_");
        const newFriendshipRef = doc(db, friendships_collection, friendshipId);

        // Write the data into Firestore
        await setDoc(newFriendshipRef, data);
        await sendFriendNotification(currentUser.id, friend.id);
        alert('Friend Request Sent!')
        console.log('Friendship successfully initiated!');

    } catch (error) {
        console.error('Error creating friendship:', error);
    }
};


{/** UTIL */ }

export const existingFriendshipQuery = async (currentUser: User, friend: User) => {
    if (currentUser.id === friend.id) {
        console.error('You cannot add yourself as a friend!');
        return [true, status[3]];
    }

    const existingFriendshipQuery = query(
        friendshipsRef,
        where('user1', 'in', [currentUser.id, friend.id]),
        where('user2', 'in', [currentUser.id, friend.id])
    );

    const existingFriendshipSnapshot = await getDocs(existingFriendshipQuery);
    console.log("empty?", existingFriendshipSnapshot.empty, "snapshot: ", existingFriendshipSnapshot)
    if (!existingFriendshipSnapshot.empty) {
        const friendRef = existingFriendshipSnapshot.docs[0].data()
        const existingStatus = friendRef.status;
        if (existingStatus === status[1]) {
            return [true, status[1]];
        }
        if (existingStatus === status[0]) {
            return [true, status[0]];
        }
        return [true, null];
    }
    return [false, null];
}

{/** READ (GET | LIST) --> QUERY */ }

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

        // const friendshipsRef = collection(db, 'friendships');

        const approvedQ1 = query(friendshipsRef, where('status', '==', status[1]), where('user1', '==', currentUser.id));
        const approvedQ2 = query(friendshipsRef, where('status', '==', status[1]), where('user2', '==', currentUser.id));

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

        const pendingQ1 = query(friendshipsRef, where('status', '==', status[0]), where('user2', '==', currentUser.id)); // The user that has been requested 

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

        const countQuery1 = query(friendshipsRef, where('status', '==', status[1]), where('user1', '==', friend.id));
        const countQuery2 = query(friendshipsRef, where('status', '==', status[1]), where('user2', '==', friend.id));

        const [querySnapshot1, querySnapshot2] = await Promise.all([getDocs(countQuery1), getDocs(countQuery2)]);
        const friendCount = querySnapshot1.size + querySnapshot2.size;
        return friendCount.toString();

    } catch (error) {
        console.error('Error fetching friends:', error);
        return '0';
    }
}

{/** UPDATE */ }

export const AcceptFriendship = async (id: string) => {
    const data = {
        status: status[1], // approved
    };
    try {
        const friendshipDoc = doc(db, friendships_collection, id);

        await updateDoc(friendshipDoc, data);
        console.log('Friendship accepted!');

    } catch (error) {
        console.error('Error accepting friendship:', error);
    }
};

/**
 * Update friendship username of the user in each document they appear in
 * @props User
 * WIP
 */
export const updateFriendshipUsername = async (user: User) => {
    try {
        const allFriendships = await FriendshipQuery()

        for (const docSnap of allFriendships) {
            const friendshipDocRef = doc(db, friendships_collection, docSnap.id)
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


{/** DELETE */ }

/**
* Deletes Friendship Document
* @param {string} id - Friendship Document ID
* @returns {void}
*/
export const DeleteFriendship = async (id: string) => {
    try {
        const friendshipDoc = doc(db, friendships_collection, id);

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

        const approvedQ1 = query(friendshipsRef, where('status', '==', status[1]), where('user1', '==', userId));
        const approvedQ2 = query(friendshipsRef, where('status', '==', status[1]), where('user2', '==', userId));

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
// notifications 
/**
 * send notification to user's friends when they post 
 * @param userId 
 */
export const sendPostNotifications = async (userId: string, postId: string) => {
    try {

        const user: User | null = await fetchUserByUID(userId);
        if (!user) {
            console.error("User not found");
            return;
        }

        const friends = await FriendQueryBasedOnUserId(userId); //fetch friends list 
        console.log(friends);
        if (!friends || friends.length === 0) {
            console.log("No friends found.");
            return;
        }

        for (const friend of friends) { //iterate through friends 
            const userDocRef = doc(db, "users", friend.friendId); // reference to friend's document 
            const notificationRef = collection(userDocRef, "notifications"); // subcollection 

            await addDoc(notificationRef, {
                postId: postId,
                postUserId: userId,
                message: `View @${user.username}'s recent trip!`,
                createdAt: serverTimestamp(),
                read: false
            });
            console.log('Notification', 'Successfully created.');

        }

    } catch (error) {
        console.error('Error creating notification for the post', error);
    }

};
/**
 * send notification when friend request sent 
 */
export const sendFriendNotification = async (userId: string, friendId: string) => {

    try {

        const user: User | null = await fetchUserByUID(userId);
        if (!user) {
            console.error("User not found");
            return;
        }

        const userDocRef = doc(db, "users", friendId); // reference to friend's document 
        const notificationRef = collection(userDocRef, "notifications"); // subcollection 

        await addDoc(notificationRef, {
            friendRequestUserId: userId,
            message: `@${user.username} sent you a friend request`,
            createdAt: serverTimestamp(),
            read: false
        });
        console.log('Friend request Notification', 'Successfully created.');

    } catch (error) {
        console.error('Error creating notification for the post', error);
    }
};


/**
 * loads Notifications real time 
 * @param userId 
 * @param callback 
 * @returns 
 */

export const fetchNotifications = async (userId: string, callback: (notifications: Notification[]) => void) => {
    if (!userId) {
        throw new Error("User ID is required to fetch post.");
    }
    try {

        const userDocRef = collection(db, "users", userId, "notifications");
        const q = query(userDocRef, orderBy("createdAt", "desc"))
        //const q = query(collection(db, "notifications"), where("friendId", "==", userId));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const notifications: Notification[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Notification[];

            callback(notifications)
        });
        return unsubscribe;

    } catch (error) {
        console.error('Error fetching notifications', error);
        throw error;
    }

};
/**
 *  Update notifications read to true & deletes from database 
 * @param notification 
 */
export const updateNotification = async (notification: Notification) => {
    try {
        const notificationRef = doc(db, "notifications", notification.id);

        await updateDoc(notificationRef, { read: true }); // notification has been read 
        await deleteDoc(notificationRef); // delete after its been read 
    } catch (error) {
        console.error('Error updating and deleting notification:', error);
    }

};
export const deleteFriendshipAndNotifications = async (id: string) => {
    try {
        // fetch friendship document 
        const friendshipDocRef = doc(db, friendships_collection, id);
        const friendshipSnap = await getDoc(friendshipDocRef);
        // confirm friendship exists 
        if (!friendshipSnap.exists()) {
            console.error("Friendship does not exist.");
            return;
        }
        // get user ids
        const { user1, user2 } = friendshipSnap.data();

        // notifications for both users
        const user1NotificationRef = collection(db, "users", user1, "notifications");
        const user2NotificationRef = collection(db, "users", user2, "notifications");

        // delete notifications created by user2 for user1
        const notificationsUser1 = await getDocs(query(user1NotificationRef, where("postUserId", "==", user2)));
        for (const docSnap of notificationsUser1.docs) {
            await deleteDoc(docSnap.ref);
        }
        console.log("Post notifications by user2 to user1 deleted.");

        // delete notifications created by user1 for user2
        const notificationsUser2 = await getDocs(query(user2NotificationRef, where("postUserId", "==", user1)));
        for (const docSnap of notificationsUser2.docs) {
            await deleteDoc(docSnap.ref);
        }
        console.log("Post notifications by user1 to user2 deleted.");

        // dlete the friendship document
        await deleteDoc(friendshipDocRef);
        console.log("Friendship successfully deleted!");


    } catch (error) {
        console.error("Error deleting friendship and notifications:", error);
    }
};

export const deletePostNotification = async (userId: string, postId: string) => {
    if (!userId) {
        throw new Error("User ID is required to delete post notification.");
    }

    try {
        const friends = await FriendQueryBasedOnUserId(userId); //fetch friends list 
        if (!friends || friends.length === 0) {
            console.log("No friends found.");
            return;
        }

        for (const friend of friends) {
            const notificationRef = collection(db, "users", friend.friendId, "notifications");
            const snapshot = await getDocs(query(notificationRef, where("postId", "==", postId)));

           for (const docSnap of snapshot.docs) {
                await deleteDoc(docSnap.ref);
            }
            console.log(`Deleted notifications for post ${postId}`);
        }

    } catch (error) {
        console.error("Error deleting post notifications:", error);
    }
};