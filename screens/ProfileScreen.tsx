import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Title, Subheading } from 'react-native-paper';

import { View, Text } from '../components/Themed';
import { SearchCourse } from '../components/SearchCourse';

export const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <UserInfo />
    </View>
  );
};

const UserInfo = () => {
  return (
    <View style={styles.userInfo}>
      <Avatar.Text size={150} label={'WB'} />
      <Title>Welvin Bun</Title>
      <Subheading>Computer Science Junior</Subheading>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  userInfo: {
    alignItems: 'center',
    margin: 5,
  },
});
