import { Post } from '@/data/types'
import db from '@/firestore';
import { addDoc, doc, collection, query, orderBy, serverTimestamp, onSnapshot, updateDoc, deleteDoc} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebase';
import { sendPostNotifications } from './Friendship';

/**
 * Save post 
 * 
 */

export const savePost = async (
    userId: string,
    image: string,
    location: string,
    review: string,
    rating: number,
): Promise<void> => {
    if (!userId) {
        throw new Error("User ID is required to savepost.");
    }
    try {
        const response = await fetch(image);
        const blob = await response.blob();

        const fileDate = Date.now();
        const storageRef = ref(storage, `user_posts/${userId}/${fileDate}`);
        await uploadBytes(storageRef, blob);

        const downloadURL = await getDownloadURL(storageRef);

        const userDocRef = doc(db, "users", userId); // reference to user's document 
        const postRef = collection(userDocRef, "posts"); //subcollection

        await addDoc(postRef, {
            location,
            review,
            published: true,
            authorUid: userId,
            image: downloadURL,
            createdAt: serverTimestamp(),
            rating,
        });
        console.log(`Saved Post.`)
        await sendPostNotifications(userId)
    } catch (error) {
        console.error("Error saving post: ", error);
        throw error;
    }
};
/**
 * fetch posts
 * @param userId 
 * @returns 
 */

export const loadPosts = async (userId: string, callback: (posts: Post[]) => void) => {
    if (!userId) {
        throw new Error("User ID is required to fetch post.");
    }
    try {
        const userDocRef = collection(db, "users", userId, "posts");
        const q = query(userDocRef, orderBy("createdAt", "desc")); //newer post at the top 

        const unsubscribe = onSnapshot(q, (snapshot) =>{
            const posts: Post[] = snapshot.docs.map((doc) =>({
                id: doc.id,
                ...doc.data(),
            })) as Post[];

            callback(posts);
        });
        return unsubscribe;

    } catch (error) {
        console.error("Error fetching posts :", error);
        throw error;
    }
};
/**
 * update post 
 */
export const updatePost = async (userId: string, postId: string, newLocation: string, newReview: string, newRating: number) => {
    if (!userId) {
        throw new Error("User ID is required to update post.");
    }
    try {
        const postDocRef = doc(db, "users", userId, "posts", postId);
        await updateDoc(postDocRef, {
            location: newLocation,
            review: newReview,
            rating: newRating,
          });
          console.log('Post updated successfully');

    } catch (error) {
        console.error("Error updating posts :", error);
        throw error;
    }
};

export const deletePost = async (userId: string, postId: string) => {
    try {
      const postRef = doc(db, "users", userId, "posts", postId); // reference doc 
      await deleteDoc(postRef);
      console.log('Post deleted successfully');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  