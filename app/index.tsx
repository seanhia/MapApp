import { useState} from "react";
import { Text, View, StyleSheet, KeyboardAvoidingView, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signUp = () => {

  }
  const signIn = () => {
    
  }




  return (
    <View
      style={styles.container}
    >
      <KeyboardAvoidingView behavior="padding">
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder = "Email"
            />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder = "Password"

            />
            <Button onPress={signUp} title="Sign Up" />
            <Button onPress={signIn} title="Sign In" />


        </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
});
