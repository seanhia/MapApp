import { View, Text, StyleSheet } from 'react-native';
import { getStats } from '@/firestore';
import { fetchCurrentUser } from '@/data/UserDataService';
import { useEffect, useState } from 'react';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { TravelChallenges } from './components/achievements';
import { getAchievementData } from "@/firestore";

const passport = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const [CityCountry, setCityCountry] = useState<{cities: string; countries: string}[]>([]);
    const [userData, setUserData] = useState<{
      distanceTraveled: number;
      cities: string[];
      countries: string[];
    } | null>(null);

    useEffect(() => {
      const getUser = async () => {
        try {
          const user = await fetchCurrentUser();
          if (user) {
            setUserId(user.id);
            const data = await getAchievementData(user.id); //fetch achievement data
            setUserData(data);
          }
        } catch (e) {
          console.error("error fetching user or data", e);
        }
      };
    
      getUser();
    }, []);

    useEffect(() => {
        const fetchStats = async () => { // get city/country stats
            if (!userId) return;
            try {
                const data = await getStats(userId);
                setCityCountry(data);
            } catch(e){
                console.error("error getting stats ", e);
            }
        };
        fetchStats();
    },[userId])
    return (
        <SafeAreaProvider>
          <SafeAreaView style={style.container}>
              <Text style={style.title}> Virtual Passport</Text>

                <View style={style.column}>
                  <View>
                    <Text style={style.title}> Places Visited</Text>
                    {CityCountry.map((stat, index) => (
                      <View style={style.list} key={index}>
                        <Text>{stat.cities}, {stat.countries}</Text>
                      </View>
                    ))}
                  </View>
                  {userData && <TravelChallenges userData={userData} />}
                </View>

          </SafeAreaView>
        </SafeAreaProvider>
      );
    };
    
export default passport;

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
  list: {
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    color: '#FFFFFF',
    backgroundColor: '#48b3ee',
  },
  column: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
    marginBottom: 10,
    gap: 20,
  }
  })