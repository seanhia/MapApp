import { Timestamp, FieldValue, CollectionReference } from "firebase/firestore";
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


export const userSubcollections = ['posts', 'locations', 'favorite', 'stats'];

export interface Friend {
    id: string,
    friendId: string,
    friendUsername: string,
    createdAt: Date,
    status: string, 
    friendProfilePhoto?: string,
};

/** Don't change this !! could result in errors in Friendships.tsx */
export const status = [
    'pending',
    'approved',
    'rejected', 
    'invalid'
]

export interface Post {
    id: string,
    location: string,
    review: string,
    published: boolean, 
    authorUid: string, 
    image?: string,
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


export interface Notification {
    id: string,
    postId?: string,
    postUserId?: string,
    friendRequestUserId?: string,
    message: string,
    createdAt: Timestamp,
    read: boolean,
};

export interface Leaderboard {
    id: string,
    ranking: number,
    userid: string,
    username: string,
    points: number,
    last_updated: Date,
}; 

export interface FavoriteLoc {
    id: string, 
    latitude: string,  
    longitude: string,
    name: string
}

export interface RecommendationLoc {
    id: string,
    displayName: string
}

export interface GraphNode {
    id: string;
    label: string;
    group: 'currentUser' | 'mutualFriend' | 'potentialFriend';
  }
  
  export interface GraphEdge {
    source: string;
    target: string;
  }
  
  export interface GraphData {
    nodes: GraphNode[];
    edges: GraphEdge[];
  }


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
};

export interface Stats {
    cities: string;
    countries: string;

}

