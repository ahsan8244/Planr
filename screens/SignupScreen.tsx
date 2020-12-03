import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import 'firebase/firestore';

import { View } from '../components';
import { firebase } from '../firebase';
import { User } from '../types';
import { UserContext } from '../context';

const db = firebase.firestore();

export const SignupScreen = () => {
  const { setUser } = useContext(UserContext);
  const [usersData, setUsersData] = useState<User[]>([]);
  const [facultiesData, setFacultiesData] = useState<
    { name: string; majors: string[] }[]
  >([]);

  const [userInput, setUserInput] = useState<User>({
    name: '',
    email: '',
    password: '',
    username: '',
    faculty: '',
    major: '',
    year: '',
  });
  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    (async () => {
      const usersRef = db.collection('users');
      const facultiesRef = db.collection('faculties');

      const usersSnapshot = await usersRef.get();
      const facultiesSnapshot = await facultiesRef.get();

      const users = [];
      const faculties = [];

      usersSnapshot.forEach(childSnapshot => {
        users.push(childSnapshot.data());
      });

      facultiesSnapshot.forEach(childSnapshot =>
        faculties.push(childSnapshot.data())
      );

      setUsersData(users);
      faculties.sort((faculty1, faculty2) => faculty1.name > faculty2.name);
      for (const faculty of faculties) {
        faculty.majors.sort((major1, major2) => major1 > major2);
      }

      setFacultiesData(faculties);
    })();
  }, []);

  const onSignup = async () => {
    const { username, email, password, name, faculty, major, year } = userInput;
    const usernameData = usersData.map(({ username }) => username);
    const emailData = usersData.map(({ email }) => email);

    if (
      name === '' ||
      email === '' ||
      username === '' ||
      password === '' ||
      faculty === '' ||
      major === '' ||
      year === ''
    ) {
      setErrorMessage('Please fill in all field');
      setIsErrorVisible(true);
    } else if (usernameData.includes(username)) {
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
        onChangeText={name => setUserInput({ ...userInput, name })}
      />
      <TextInput
        label="Email"
        mode="outlined"
        value={userInput.email}
        onChangeText={email => setUserInput({ ...userInput, email })}
      />
      <TextInput
        label="Username"
        mode="outlined"
        value={userInput.username}
        onChangeText={username => setUserInput({ ...userInput, username })}
      />
      <TextInput
        label="Password"
        mode="outlined"
        value={userInput.password}
        onChangeText={password => setUserInput({ ...userInput, password })}
      />
      <View style={{ zIndex: 3 }}>
        <DropDownPicker
          placeholder="Faculty"
          items={facultiesData.map(({ name: facultyName }) => ({
            label: facultyName,
            value: facultyName,
          }))}
          containerStyle={{ height: 50, marginTop: 5, marginBottom: 5 }}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          onChangeItem={({ value: faculty }) =>
            setUserInput({
              ...userInput,
              faculty,
            })
          }
        />
      </View>
      <View style={{ zIndex: 2 }}>
        <DropDownPicker
          placeholder="Major"
          items={
            userInput.faculty === ''
              ? []
              : facultiesData
                  .filter(({ name }) => name === userInput.faculty)[0]
                  .majors.map(majorName => ({
                    label: majorName,
                    value: majorName,
                  }))
          }
          containerStyle={{ height: 50, marginTop: 5, marginBottom: 5 }}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          onChangeItem={({ value: major }) =>
            setUserInput({
              ...userInput,
              major,
            })
          }
        />
      </View>
      <View style={{ zIndex: 1 }}>
        <DropDownPicker
          placeholder="Year"
          items={['1', '2', '3', '4'].map(year => ({
            label: year,
            value: year,
          }))}
          containerStyle={{ height: 50, marginTop: 5, marginBottom: 5 }}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          onChangeItem={({ value: year }) =>
            setUserInput({
              ...userInput,
              year,
            })
          }
        />
      </View>
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
