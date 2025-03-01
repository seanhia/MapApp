// firestoreSchema.ts

export const COLLECTIONS = {
    USERS: "users",
    FRIENDSHIPS: "friendships",
    LEADERBOARD: "leaderboard_entry",
} as const;

export const USER_SUBCOLLECTIONS = {
    LOCATIONS: "locations",
    POSTS: "posts",
} as const;

export const USER_FIELDS = {
    USERNAME: "username",
    EMAIL: "eMail",
    PROFILE_PIC: "profilePicture",
} as const;

export const FRIENDSHIP_FIELDS = {
    CREATED_AT: "createdAt",
    STATUS: "status",
    USER1_ID: "user1",
    USER2_ID: "user2",
    USERNAME1: "username1",
    USERNAME2: "username2",
} as const;

export const LEADERBOARD_FIELDS = {
    USER_ID: "userid",
    USERNAME: "username",
    RANKING: "ranking",
    POINTS: "points",
    LAST_UPDATED: "lastUpdated",
} as const;

export const POST_FIELDS = {
    TITLE: "title",
    CONTENT: "content",
    PUBLISHED: "published",
    AUTHOR_ID: "authorUid",
    IMAGES: "images",
    CREATED_AT: "createdAt",
    RATING: "rating",
    LIKES: "likes",
    COMMENTS: "comment",
} as const;

export const LOCATION_FIELDS = {
    LASTDISTANCE: "distanceFromLast",
    LATITUDE: "latitude",
    LONGITUDE: "longitude",
    TIMESTAMP: "timestamp",
} as const;