import React from "react";
import { getAuth } from "firebase/auth";
import useRealTimeTracking from "@/app/hooks/useRealTimeTracking";
import { View, Text } from 'react-native';

const RealTimeTracker: React.FC = () => {
  const auth = getAuth(); // initialize Firebase Auth
  const userId = auth.currentUser?.uid; // get current user's ID

  console.log("RealTimeTracker - Current userId:", userId);

  if (!userId) {
    console.error("User is not logged in or userId is undefined!");
    return <p>Please log in to use location tracking.</p>;
  }

  // pass userId and a radius of 100 meters
  const [location, error] = useRealTimeTracking(userId, 100); 

  return (
    <View>
      {error && <p>Error: {error}</p>}
      {location ? (
          <Text>Current Location: {location.coords.latitude}, {location.coords.longitude}</Text>
      ) : (
        <Text>Tracking location...</Text>
      )}
    </View>
  );
};

export default RealTimeTracker;
