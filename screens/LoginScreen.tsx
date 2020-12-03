import React, { useState, useContext } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { TextInput, Button, Text, Title } from 'react-native-paper';
import 'firebase/firestore';

import { View } from '../components';
import { firebase } from '../firebase';
import { UserContext } from '../context';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

const db = firebase.firestore();

export const LoginScreen = ({ navigation }: any) => {
  const { user, setUser } = useContext(UserContext);
  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false);

  const sendPushNotification = async (expoPushToken: string) => {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Original Title',
      body: 'And here is the body!',
      data: { data: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  };

  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
      return token;
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  };

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
        await registerForPushNotificationsAsync().then(token => {
          token && sendPushNotification(token);
          console.log(`sent notif to token: ${token}`);
        });
      }
    }
  };

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <View style={styles.container}>
      <View
        style={{
          display: 'flex',
          alignItems: 'baseline',
          marginBottom: 24,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: 36 }}>Planr</Text>
        <Text style={{ fontSize: 48, color: '#a845d6' }}>.</Text>
      </View>
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
