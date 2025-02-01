import { Post } from '@/data/types'
import db from '@/firestore';
import { doc, getDocs, collection, query, limit} from 'firebase/firestore';


/**
 * Fetch a post that isn't already in the array of loaded posts.
 * @param authorId - The ID of the author.
 * @param loadedPosts - Array of posts already loaded to avoid duplicates.
 * @returns Updated list of posts including the newly fetched one.
 */
export const fetchPostbyAuthor = async (lastPostId: string, authorId: string, loadedPosts: Post[] | []): Promise<Post[] | null> => {
    try {
        const postRef = collection(db, `users/${authorId}/posts`); 

        const postsQuery = query(postRef, limit(1)); 

        const querySnapshot = await getDocs(postsQuery); 
        const newPosts: Post[] = [];

        querySnapshot.forEach((doc) => {
            const postData = doc.data() as Post; 

            // Ensure we don't add duplicates 
            if (!loadedPosts.some((p) => p.id === doc.id)) {
                const { id, ...restOfPostData } = postData;
                newPosts.push({ id: doc.id, ...restOfPostData}); 
            }
        }); 
       
        return newPosts.length > 0  ? newPosts : null; 
    } catch(error) {
        console.error('Error fetching post: ', error);
        return null; 
    } 
};



