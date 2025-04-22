/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.recommendFriends = functions.https.onCall(async (data, context) => {
    const userId = context.auth?.uid;
    if (!userId) throw new functions.https.HttpsError("unauthenticated", "User must be logged in");

    try {
        // 1. Get user's current friends
        const friendshipSnapshot = await db.collection("friendships")
            .where("status", "==", "approved")
            .where("user1", "==", userId)
            .get();

        const directFriends = new Set();
        friendshipSnapshot.forEach(doc => {
            directFriends.add(doc.data().user2);
        });

        // 2. Get friends of those friends
        const friendsOfFriends = new Set();

        for (let friendId of directFriends) {
            const foafSnap = await db.collection("friendships")
                .where("status", "==", "approved")
                .where("user1", "==", friendId)
                .get();

            foafSnap.forEach(doc => {
                const foafId = doc.data().user2;
                if (foafId !== userId && !directFriends.has(foafId)) {
                    friendsOfFriends.add(foafId);
                }
            });
        }

        // 3. Optionally: get details of those recommended users
        const recommendedUsers = [];
        for (let uid of friendsOfFriends) {
            const userDoc = await db.collection("users").doc(uid).get();
            if (userDoc.exists) {
                recommendedUsers.push({ id: uid, ...userDoc.data() });
            }
        }

        return { recommendedFriends: recommendedUsers };

    } catch (error) {
        console.error("Error recommending friends:", error);
        throw new functions.https.HttpsError("internal", "Could not get recommendations");
    }
});


exports.getUserProfile = functions.https.onCall(async (data, context) => {
    const userId = context.auth?.uid;
    if (!userId) throw new functions.https.HttpsError("unauthenticated", "User must be logged in");

    try {
        const userDoc = await db.collection("users").doc(userId).get();
        if (!userDoc.exists) {
            throw new functions.https.HttpsError("not-found", "User profile not found");
        }
        return { profile: userDoc.data() };
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw new functions.https.HttpsError("internal", "Could not fetch user profile");
    }
}); 