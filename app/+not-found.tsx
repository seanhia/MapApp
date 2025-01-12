import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import sharedStyles from '@/constants/sharedStyles';


export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.link}>This screen doesn't exist.</Text>
        <TouchableOpacity style={sharedStyles.lightButton}>
          <Link href="/" style={sharedStyles.text}>
            <Text 
            // type="link"
            >Go to home screen!
            </Text>
            
          </Link>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    fontSize: 20,
    marginTop: 15,
    paddingVertical: 15,
  },
});
