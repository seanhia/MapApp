import { getAuth } from 'firebase/auth';
import React from 'react';
import { Text, View } from 'react-native';

const auth = getAuth();

const getCurrentUser = () => {
  const user = auth.currentUser;
  if (user) {
    // User is signed in
    console.log('User ID:', user.uid);
    console.log('Email:', user.email);
    console.log('Display Name:', user.displayName);
    return user;
  } else {
    // No user is signed in
    console.log('No user is signed in.');
    return null;
  }
};

const UserInfo = () => {
  const user = getCurrentUser();

  if (!user) {
    return <Text>No user is signed in.</Text>;
  }

  return (
    <View>
      <Text>User ID: {user.uid}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Display Name: {user.displayName || 'No display name set'}</Text>
    </View>
  );
};

export default UserInfo;

