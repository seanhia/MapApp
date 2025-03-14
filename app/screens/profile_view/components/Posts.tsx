import { loadPosts } from "@/data/PostDataService";
import { Post, User } from "@/data/types";
import { useState, useEffect } from "react";
import ProfilePost from "@/app/screens/user_profile/components/Photos/ProfilePost";

 
interface Props{
     user: User | null ;
 }
 
export const Posts: React.FC<Props> = ({ user}) => {
    const [posts, setPosts] = useState<Post[]>([]);
 
    useEffect (() => {
        if (!user || !user.id) {
            console.error("User ID is undefined. Cannot fetch posts.");
            return;
        }
        const fetchPosts = async () => {
            try {
                const unsubscribe = await loadPosts(user.id, (newPosts) => {
                    setPosts(newPosts); 
                });
                
                return () => {
                    unsubscribe();
                };
            } catch (error) {
                console.error("Error fetching posts:", error); 
            }
        };
    
        fetchPosts(); 

    },[user]); // re-runs whenever user changes 

    return (
    <ProfilePost
            posts={posts}
            user={user}
            />
    )
}