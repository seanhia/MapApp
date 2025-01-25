import React from "react";
import { getAuth } from "firebase/auth";
import useRealTimeTracking from "../hooks/useRealTimeTracking"; // Adjust the path to your hook

const RealTimeTracker: React.FC = () => {
  const auth = getAuth(); // Initialize Firebase Auth
  const userId = auth.currentUser?.uid; // Get the current user's ID

  console.log("RealTimeTracker - Current userId:", userId);

  if (!userId) {
    console.error("User is not logged in or userId is undefined!");
    return <p>Please log in to use location tracking.</p>;
  }

  // Call the useRealTimeTracking hook
  const [location, error] = useRealTimeTracking(userId, 100); // Pass userId and a radius of 100 meters

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {location ? (
        <p>
          Current Location: {location.coords.latitude}, {location.coords.longitude}
        </p>
      ) : (
        <p>Tracking location...</p>
      )}
    </div>
  );
};

export default RealTimeTracker;
