import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const db = firebase.firestore();
// const db = getFirestore();

// // Create a new document in the "users" collection
// db.collection("users").add({
//   name: "John Doe",
//   email: "john.doe@example.com",
//   location: "New York"
// })
// .then(docRef => {
//   console.log("Document written with ID: ", docRef.id);
// })
// .catch(error => {
//   console.error("Error adding document: ", error);
// });

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchFirestoreData = async () => {
      const snapshot = await firestore().collection('users').get();
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(items);
    };

    fetchFirestoreData();
  }, []);

return (
  <View>
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Text>{item.name}</Text>}
    />
  </View>
);
};

export default App;