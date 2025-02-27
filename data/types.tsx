import { Timestamp } from "firebase/firestore";
import { ImageSourcePropType } from "react-native";

export interface User {
    id: string;
    username: string;
    eMail: string;
    createdAt: Date;
    bio?: string; 
    phoneNumber?: string; 
    isPrivate?: boolean; 
    isDarkMode?: boolean; // Currently based on the user device settings 
    points?: number; 
    profilePhoto?: string;
  };

export const userSubcollections = ['posts', 'locations'];

export interface Friend {
    id: string,
    friend_id: string,
    friend_username: string,
};

export interface Post {
    id: string,
    title: string,
    content: string,
    published: boolean, 
    authorUid: string, 
    images?: ImageSourcePropType[], //at most 5?
    createdAt: Timestamp,
    rating: Rating,
    likes?: User[], 
    comment?: string[]

};

export enum Rating {
    One = 1,
    two = 2,
    three = 3,
    four = 4,
    five = 5,
};


/** ALL INTERFACES BELOW ARE NOT INMPLEMENTED YET */

export interface PlaceDetails {
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
    };  
};

export interface Friendship {
    id: string,
    user1: string,
    user2: string,
    status: string,
    username: string,
    username2: string,
    createdAt: Date,
};

export interface Comment { 
    id: string,
    postId: string,
    content: string,
    authorId: string,
    authorUsername: string,
    createdAt: Date,
};

export interface Like { 
    id: string,
    post_id: string,
    user_id: string,
    username: string,
    createdAt: Date,
};

export interface Notification {
    id: string,
    recipient: string,
    sender: string,
    type: string,
    read: boolean,
    createdAt: Date,
};

export interface Location {
    id: string,
    name: string,
    address: string,
    city: string,
    state: string,
    zip: string,
    phone: string,
    website: string,
    createdAt: Date,
}

export interface Leaderboard {
    id: string,
    ranking: number,
    userId: string,
    // username: string,
    points: number,
    last_updated: Date,
}
