import { View, Text, StyleSheet } from 'react-native';
import { getStats } from '@/firestore';
import { fetchCurrentUser } from '@/data/UserDataService';
import { useEffect, useState } from 'react';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const passport = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const [CityCountry, setCityCountry] = useState<{cities: string; countries: string}[]>([]);

    useEffect(() => {
        const getUser = async () => { // get user id
          try {
            const user = await fetchCurrentUser(); 
            if (user) {
              setUserId(user.id); 
            }
          } catch (e) {
            console.error("error fetching user ", e);
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
              <ul >
              <Text style={style.title}> Places Visited</Text>
              {CityCountry.map((stat, index) => (
                <li style={style.list} key={index}>
                  {stat.cities}, {stat.countries}
                </li>
              ))}
            </ul>
              </View>
              <View>
              <Text style={style.title}> Achievements</Text>
              </View>
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
    borderColor: '#20232a',
    borderRadius: 100,
    backgroundColor: '#48b3ee',
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 30,
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
  }
  })