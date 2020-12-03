import React, { useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import 'firebase/firestore';

import { View } from '../components';
import { firebase } from '../firebase';
import { UserContext } from '../context';

const db = firebase.firestore();

export const LoginScreen = ({ navigation }: any) => {
  const { user, setUser } = useContext(UserContext);
  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false);

  const onLogin = async () => {
    if (!user) {
      const userRef = db
        .collection('users')
        .where('username', '==', username)
        .where('password', '==', password)
        .limit(1);
      const snapshot = await userRef.get();

      if (snapshot.empty) {
        console.log('Invalid username or password');
        setIsErrorVisible(true);
      } else {
        setUser(snapshot.docs[0].data());
      }
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
        secureTextEntry
        onChangeText={password => setPassword(password)}
      />
      <Button
        mode="outlined"
        onPress={() => onLogin()}
        style={{ marginTop: 5, marginBottom: 5, borderColor: '#6200ee' }}
      >
        Login
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('SignupScreen')}
        style={{ marginBottom: 5, borderColor: '#6200ee' }}
      >
        Sign Up
      </Button>
      <Text style={{ display: isErrorVisible ? 'flex' : 'none', color: 'red' }}>
        Invalid credentials
      </Text>
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
