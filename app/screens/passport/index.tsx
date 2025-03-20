import { View, Text } from 'react-native';
import { getStats } from '@/firestore';
import { fetchCurrentUser } from '@/data/UserDataService';
import { useEffect, useState } from 'react';

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
        <div>
          <h1>
            Virtual Passport
          </h1>
          <ul>
            {CityCountry.map((stat, index) => (
              <li key={index}>
                {stat.cities}, {stat.countries}
              </li>
            ))}
          </ul>
        </div>
      );
    };
    
export default passport;