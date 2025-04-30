import MapComponent from "@/components/MapComponent";
import { View, Text } from "react-native";
import { useState } from "react";
import { useLocalSearchParams } from "expo-router";

const FriendMap = () => {
  const { friendId } = useLocalSearchParams();
  const [mapCenter, setMapCenter] = useState({ lat: 33.7838, lng: -118.1141 });
  const [weather, setWeather] = useState<{ iconUrl?: string; description?: string; details?: any } | null>(null);
  const darkMode = "51d9728a5051a451";

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          backgroundColor: "rgba(255, 255, 255, 1)",
          padding: 10,
          borderRadius: 8,
          zIndex: 10,
        }}
      >
        <Text>Friend's USER ID: {friendId}</Text>
      </View>

      <MapComponent 
        initialCenter={mapCenter} 
        mapId={darkMode}
        weatherIcon={weather?.iconUrl}
        userId={friendId as string} 
      />
    </View>
  );
};

export default FriendMap;
