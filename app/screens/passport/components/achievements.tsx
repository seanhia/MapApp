import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { achievementLogic } from "../../../hooks/achievementLogic";

type AchievementStatus = {
  id: string;
  label: string;
  unlocked: boolean;
};

export const TravelChallenges = ({
  userData,
}: {
  userData: {
    distanceTraveled: number;
    cities: string[];
    countries: string[];
  };
}) => {
  const [achievements, setAchievements] = useState<AchievementStatus[]>([]);

  useEffect(() => {
    if (!userData) return;

    const unlocked = achievementLogic.map((a) => ({
      id: a.id,
      label: a.label,
      unlocked: a.check(userData),
    }));

    setAchievements(unlocked);
  }, [userData]);

  return (
    <View>
      <Text style={style.title}>Achievements</Text>
      <View>
        {achievements.map((a) => (
          <Text key={a.id} style={a.unlocked ? style.yes : style.no}>
            {a.label}
          </Text>
        ))}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: '#eaeaea',
    },
    title: {
      marginTop: 16,
      paddingVertical: 6,
      borderWidth: 6,
      borderColor: '#FFFFFF',
      borderRadius: 15,
      backgroundColor: '#48b3ee',
      color: '#FFFFFF',
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
    },
    yes: {
      marginTop: 12,
      padding: 12,
      borderRadius: 8,
      color: '#FFFFFF',
      backgroundColor: '#48b3ee',
    },
    no: {
        marginTop: 12,
        padding: 12,
        borderRadius: 8,
        color: '#FFFFFF',
        backgroundColor: '#888888',
      },
    column: {
      flexDirection: 'row',
      marginTop: 20,
      justifyContent: 'center',
      marginBottom: 10,
      gap: 20,
    }
    })