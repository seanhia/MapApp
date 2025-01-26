export interface User {
    id: string;
    username: string;
    eMail: string;
    createdAt: Date;
    bio?: string; 
    phoneNumber?: string; 
    isPrivate?: boolean; 
  };

export interface Friend {
    id: string,
    friend_id: string,
    friend_username: string,
};


export interface PlaceDetails {
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
    };  
};


/** ALL INTERFACES BELOW ARE NOT INMPLEMENTED YETs */
export interface Post {
    id: string,
    title: string,
    content: string,
    published: boolean, 

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
    rank: number,
    userId: string,
    username: string,
    score: number,
    createdAt: Date,
}
