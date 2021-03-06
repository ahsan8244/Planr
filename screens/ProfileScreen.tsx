import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Avatar, Title, Subheading, Button, List } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { View, Text } from '../components/Themed';
import { SearchCourse } from '../components/SearchCourse';
import { Course } from '../types';
import { UserContext } from '../context';

export const ProfileScreen = ({
  navigation,
  userInterestList,
  setUserInterestList,
}) => {
  const { user } = useContext(UserContext);
  if (!user) {
    return (
      <View style={styles.container}>
        <Title>No user logged in</Title>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <UserInfo />
      <Interest
        userInterestList={userInterestList}
        setUserInterestList={setUserInterestList}
      />
    </View>
  );
};

const UserInfo = () => {
  const { user, setUser } = useContext(UserContext);
  const level = { 1: 'Freshman', 2: 'Sophomore', 3: 'Junior', 4: 'Senior' };

  return (
    <View style={styles.userInfo}>
      <Avatar.Text
        size={100}
        label={user.name
          .split(' ')
          .map(str => str[0].toUpperCase())
          .join('')}
        style={{ marginBottom: 5 }}
      />
      <Title>
        {user.name} @{user.username}
      </Title>
      <Subheading>
        {user.major} {level[user.year]}
      </Subheading>
      <Subheading>Faculty of {user.faculty}</Subheading>
      <Button
        mode="contained"
        style={{ marginTop: 5 }}
        onPress={() => setUser(null)}
      >
        Logout
      </Button>
    </View>
  );
};

const Interest = ({ userInterestList, setUserInterestList }) => {
  const interests: string[] = [
    'Accounting',
    'Arts',
    'Economics',
    'Engineering',
    'Math',
    'Philosophy',
    'Science',
  ];

  return (
    <View style={styles.interest}>
      <Title>Interests</Title>
      <ScrollView>
        {interests.map((interest, index) => {
          const isSelected: boolean = userInterestList.includes(interest);

          return (
            <Button
              icon={isSelected ? 'check' : ''}
              mode={'outlined'}
              onPress={async () => {
                if (!isSelected) {
                  setUserInterestList([...userInterestList, interest]);
                } else {
                  setUserInterestList(
                    userInterestList.filter(a => a !== interest)
                  );
                }
                await AsyncStorage.setItem(
                  '@user_interests',
                  JSON.stringify(userInterestList)
                );
              }}
            >
              {interest}
            </Button>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  userInfo: {
    alignItems: 'center',
    margin: 5,
  },
  interest: {
    margin: 5,
  },
});
