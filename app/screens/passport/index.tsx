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
                    <Text style={style.title}> Places Visited</Text>
                    {CityCountry.map((stat, index) => (
                      <View style={style.list} key={index}>
                        {stat.cities}, {stat.countries}
                      </View>
                    ))}
                  </View>
                  <View>
                    <Text style={style.title}> Achievements</Text>
                    <View>
                      <Text style={style.list}> First City Visited!</Text>
                      <Text style={style.list}> Visited 5 Cities </Text>
                      <Text style={style.list}> Visited 3 Countries</Text>
                      <Text style={style.list}> Traveled over 1000 meters </Text>
                      <Text style={style.list}> Share a post! </Text>
                    </View>
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