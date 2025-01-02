import { doc, getDoc, collection, setDoc, getDocs, query, where, updateDoc } from 'firebase/firestore';
import PendingQuery from '@/assets/data/PendingQuery';
import db from '@/firestore';

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

export default AcceptFriendship;   