import axios from "axios";

const WEATHER_API_KEY = "c91505cb2ca1c66df5e70feade5e8d06";

// Fetch weather data
export const fetchWeather = async (latitude: number, longitude: number) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API_KEY}`
    );

    const data = response.data;
    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const description = data.weather[0].description;

    return {
      iconUrl,
      description,
      details: data,
    };
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
};

// Determine season 
export const getSeason = (latitude: number): "spring" | "summer" | "fall" | "winter" => {
  const month = new Date().getMonth(); 
  const isNorthern = latitude >= 0;

  if (isNorthern) {
    if (month >= 2 && month <= 4) return "spring";
    if (month >= 5 && month <= 7) return "summer";
    if (month >= 8 && month <= 10) return "fall";
    return "winter";
  } else {
    if (month >= 2 && month <= 4) return "fall";
    if (month >= 5 && month <= 7) return "winter";
    if (month >= 8 && month <= 10) return "spring";
    return "summer";
  }
};

// local image
export const createSeasonalImage = (season: string) => {
  switch (season) {
    case "spring":
      return require("@/assets/images/spring_icon.png");
    case "summer":
      return require("@/assets/images/summer_icon.png");
    case "autumn":
      return require("@/assets/images/fall_icon.png");
    case "winter":
      return require("@/assets/images/winter_icon.png");
    default:
      return null;
  }
};
