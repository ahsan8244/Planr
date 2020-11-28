import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import {
  TabOneScreen,
  TabTwoScreen,
  WeeklySchedule,
  ProfileScreen,
} from '../screens';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';
import { SearchCourse } from '../components';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: 'Tab One Title' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
      <TabOneStack.Screen
        name="WeeklySchedule"
        component={WeeklySchedule}
        options={{ headerTitle: 'Weekly Schedule' }}
      />
    </TabTwoStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();

function ProfileNavigator() {
  const [pastCourses, setPastCourses] = useState<Course[]>([]);
  const [userInterestList, setUserInterestList] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const pastCoursesStorage = await AsyncStorage.getItem('@past_courses');
      const userInterestStorage = await AsyncStorage.getItem('@user_interests');
      setPastCourses(pastCoursesStorage ? JSON.parse(pastCoursesStorage) : []);
      setUserInterestList(
        userInterestStorage ? JSON.parse(userInterestStorage) : []
      );
    })();
  }, []);

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={props => (
          <ProfileScreen
            {...props}
            pastCourses={pastCourses}
            setPastCourses={setPastCourses}
            userInterestList={userInterestList}
            setUserInterestList={setUserInterestList}
          />
        )}
        options={{ headerTitle: 'Profile' }}
      />
      <ProfileStack.Screen
        name="SelectPastCourses"
        component={props => (
          <SearchCourse
            {...props}
            pastCourses={pastCourses}
            setPastCourses={setPastCourses}
          />
        )}
        options={{ headerTitle: 'Select Past Courses' }}
      />
    </ProfileStack.Navigator>
  );
}
