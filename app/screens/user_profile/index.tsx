import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import ProfileHeader from './components/ProfileHeader'
import ProfileDetails from './components/ProfileDetails'
import ProfilePost from './components/ProfilePost';
import { useRouter } from 'expo-router';
import ProfileStatistics from './components/ProfileStatistics';
const userProfile = () => {
  const router = useRouter();
  return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView>
        <ProfileHeader />
        <ProfileDetails />
        <ProfilePost />
        <ProfileStatistics />

        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/screens/leaderboard')}>
            <Text style={styles.buttonText}>Leaderboard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/screens/friends')}>
            <Text style={styles.buttonText}>Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/screens/user_profile')}>
            <Text style={styles.buttonText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};
const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#87CEEB',
    paddingVertical: 10,
  },
  button: {
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default userProfile;
