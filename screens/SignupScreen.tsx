import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import 'firebase/firestore';

import { View } from '../components';
import { firebase } from '../firebase';
import { User } from '../types';
import { UserContext } from '../context';

const db = firebase.firestore();

export const SignupScreen = () => {
  const { setUser } = useContext(UserContext);
  const [usersData, setUsersData] = useState<User[]>([]);
  const [userInput, setuserInput] = useState<User>({
    name: '',
    email: '',
    password: '',
    username: '',
    major: '',
    year: '',
  });
  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    (async () => {
      const userRef = db.collection('users');
      const snapshot = await userRef.get();

      const usersSnapshot = [];

      snapshot.forEach(childSnapshot => {
        usersSnapshot.push(childSnapshot.data());
      });
      setUsersData(usersSnapshot);
    })();
  }, []);

  const onSignup = async () => {
    const { username, email, password, name, major, year } = userInput;
    const usernameData = usersData.map(({ username }) => username);
    const emailData = usersData.map(({ email }) => email);

    if (
      name === '' ||
      email === '' ||
      username === '' ||
      password === '' ||
      major === '' ||
      year === ''
    ) {
      setErrorMessage('Please fill in all field');
      setIsErrorVisible(true);
    }
    if (usernameData.includes(username)) {
      setErrorMessage('Username already exists');
      setIsErrorVisible(true);
    } else if (emailData.includes(email)) {
      setErrorMessage('Email already exists');
      setIsErrorVisible(true);
    } else if (password.length < 8) {
      setErrorMessage('Password has to be at least 8 characters');
      setIsErrorVisible(true);
    } else {
      const res = await db.collection('users').doc().set(userInput);
      setUser(userInput);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Name"
        mode="outlined"
        value={userInput.name}
        onChangeText={name => setuserInput({ ...userInput, name })}
      />
      <TextInput
        label="Email"
        mode="outlined"
        value={userInput.email}
        onChangeText={email => setuserInput({ ...userInput, email })}
      />
      <TextInput
        label="Username"
        mode="outlined"
        value={userInput.username}
        onChangeText={username => setuserInput({ ...userInput, username })}
      />
      <TextInput
        label="Password"
        mode="outlined"
        value={userInput.password}
        onChangeText={password => setuserInput({ ...userInput, password })}
      />
      <TextInput
        label="Major"
        mode="outlined"
        value={userInput.major}
        onChangeText={major => setuserInput({ ...userInput, major })}
      />
      <TextInput
        label="Year"
        mode="outlined"
        value={userInput.year}
        onChangeText={year => setuserInput({ ...userInput, year })}
      />
      <Button
        mode="contained"
        style={{ marginTop: 5, marginBottom: 5 }}
        onPress={() => onSignup()}
      >
        Sign up
      </Button>
      <Text style={{ display: isErrorVisible ? 'flex' : 'none', color: 'red' }}>
        {errorMessage}
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
