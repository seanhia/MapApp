import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import sharedStyles from '@/constants/sharedStyles';
import { useTheme } from '@/hooks/useTheme'; 

export default function NotFoundScreen() {
  const { colorScheme, styles } = useTheme();
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={style.container}>
        <Text style={style.link}>This screen doesn't exist.</Text>
        <TouchableOpacity style={styles.lightButton}>
          <Link href="/" style={styles.text}>
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

const style = StyleSheet.create({
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
