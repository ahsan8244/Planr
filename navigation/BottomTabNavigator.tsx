import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import {
  CoursesList,
  MyPlanr,
  PreferencesForm,
  ProfileScreen,
  ScheduleOptions,
} from '../screens';
import {
  BottomTabParamList,
  TabOneParamList,
  GenerateTabParamList,
  ISubsectionToCourse,
  MyPlanrTabParamList,
} from '../types';
import { SearchCourse } from '../components';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Courses"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
        style: { paddingBottom: 8 },
      }}
    >
      <BottomTab.Screen
        name="MyPlanr"
        component={MyPlanrNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-calendar" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Courses"
        component={CoursesNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-list" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Generate"
        component={GenerateNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-create" color={color} />
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
const MyPlanrStack = createStackNavigator<MyPlanrTabParamList>();

function MyPlanrNavigator() {
  return (
    <MyPlanrStack.Navigator>
      <MyPlanrStack.Screen
        name="MyPlanr"
        component={MyPlanr}
        options={{ headerTitle: 'MyPlanr' }}
      />
    </MyPlanrStack.Navigator>
  );
}

const CoursesStack = createStackNavigator<TabOneParamList>();

function CoursesNavigator() {
  return (
    <CoursesStack.Navigator>
      <CoursesStack.Screen
        name="Courses"
        component={CoursesList}
        options={{ headerTitle: 'Courses' }}
      />
    </CoursesStack.Navigator>
  );
}

const GenerateScheduleStack = createStackNavigator<GenerateTabParamList>();

export type GenerateStackParamList = {
  ScheduleOptions: { generatedSchedules: ISubsectionToCourse[][] };
};

function GenerateNavigator() {
  return (
    <GenerateScheduleStack.Navigator>
      <GenerateScheduleStack.Screen
        name="PreferencesForm"
        component={PreferencesForm}
        options={{ headerTitle: 'Select Preferences' }}
      />
      <GenerateScheduleStack.Screen
        name="ScheduleOptions"
        component={ScheduleOptions}
        options={{ headerTitle: 'Schedule Options' }}
      />
    </GenerateScheduleStack.Navigator>
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
