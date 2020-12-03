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
  pastCourses,
  setPastCourses,
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
      <PastCourses navigation={navigation} pastCourses={pastCourses} />
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
          .map(str => str[0])
          .join('')}
        style={{ marginBottom: 5 }}
      />
      <Title>
        {user.name} @{user.username}
      </Title>
      <Subheading>
        {user.major} {level[user.year]}
      </Subheading>
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

const PastCourses = ({ navigation, pastCourses }) => {
  const pastCoursesUnique: Course[] = [];
  for (const course of pastCourses) {
    if (!pastCoursesUnique.map(course => course.code).includes(course.code)) {
      pastCoursesUnique.push(course);
    }
  }

  return (
    <View style={styles.pastCourses}>
      <Title>Past courses</Title>
      <ScrollView style={{ maxHeight: 200 }}>
        {pastCoursesUnique.length > 0 ? (
          pastCoursesUnique.map((course, index) => (
            <List.Item
              key={index}
              title={course.code}
              description={course.name}
            />
          ))
        ) : (
          <Subheading>You have not added any past courses.</Subheading>
        )}
      </ScrollView>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('SelectPastCourses')}
        style={{ marginTop: 5 }}
      >
        Add past courses
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
  pastCourses: {
    margin: 5,
  },
  interest: {
    margin: 5,
  },
});
