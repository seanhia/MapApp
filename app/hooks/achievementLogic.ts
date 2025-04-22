type AchievementContext = {
    cities: string[];
    countries: string[];
    distanceTraveled: number;
  };

export const achievementLogic = [
    {
        id: "firstCity",
        label: "First City Visited!",
        check: ({ cities }: AchievementContext) => cities.length >= 1,
      },
      {
        id: "fiveCities",
        label: "Visited 5 Cities",
        check: ({ cities }: AchievementContext) => new Set(cities).size >= 5,
      },
      {
        id: "threeCountries",
        label: "Visited 3 Countries",
        check: ({ countries }: AchievementContext) => new Set(countries).size >= 3,
      },
      {
        id: "traveled1km",
        label: "Traveled over 1000 meters",
        check: ({ distanceTraveled }: AchievementContext) => distanceTraveled > 1000,
      },
    ];