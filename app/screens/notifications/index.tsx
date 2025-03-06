import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface NotificationsScreenProps {
  onClose: () => void; 
}

const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ onClose }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Notifications</Text>


      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 10,
    padding: 10

},
  closeButtonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});