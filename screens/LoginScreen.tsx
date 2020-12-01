import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import 'firebase/firestore';

import { View } from '../components';
import { firebase } from '../firebase';
import { UserContext } from '../context';

const db = firebase.firestore();

export const LoginScreen = () => {
  const { user, setUser } = useContext(UserContext);

  const onLogin = async () => {
    const userRef = db
      .collection('users')
      .where('username', '==', username)
      .where('password', '==', password)
      .limit(1);
    const snapshot = await userRef.get();

    if (snapshot.empty) {
      console.log('Invalid username or password');
    } else {
      setUser(snapshot.docs[0].data());
    }
  };

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label="Username"
        value={username}
        onChangeText={username => setUsername(username)}
      />
      <TextInput
        mode="outlined"
        label="Password"
        value={password}
        onChangeText={password => setPassword(password)}
      />
      <Button
        mode="contained"
        onPress={() => onLogin()}
        style={{ marginTop: 5, marginBottom: 5 }}
      >
        Login
      </Button>
      <Text>Doesn't have an account? </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 20,
    height: '100%',
  },
});
