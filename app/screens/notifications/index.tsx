import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { User } from '@/data/types'

interface NotificationsProps {
  user: User | null;
}

const Notifications: React.FC<NotificationsProps>= ({ user }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notifications</Text>
      <TouchableOpacity>
        <Text style={[styles.text, { fontWeight: 100 }]}> View @Nick.644 recent trip!</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Notifications;

