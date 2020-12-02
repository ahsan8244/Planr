import * as React from 'react';
import { ScrollView, View as DefaultView, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';

import { Text, View } from './Themed';

const course = {
  belongsToCourse: {
    code: 'COMP3330',
    title: 'Interactive Mobile Application Programming and Design',
    venue: 'Venue Venue',
  },
  schedule: {
    startTime: '11:00',
    endTime: '22:00',
  },
};

const CourseComponent = ({ course, onCourseClick }: any) => (
  <DefaultView style={styles.courseParent}>
    <DefaultView style={styles.courseTime}>
      <Text>{course.schedule.startTime}</Text>
      <Text>{course.schedule.endTime}</Text>
    </DefaultView>
    <View style={styles.courseCard}>
      <List.Item
        title={course.belongsToCourse.code}
        description={course.belongsToCourse.title}
        onPress={() => onCourseClick(course)}
      />
    </View>
  </DefaultView>
);

export const DayPlanner = ({ onCourseClick }: { onCourseClick: any }) => {
  return (
    <DefaultView>
      <ScrollView>
        {[1, 2, 3, 4].map(index => (
          <CourseComponent
            key={index}
            course={course}
            onCourseClick={onCourseClick}
          />
        ))}
      </ScrollView>
    </DefaultView>
  );
};

const styles = StyleSheet.create({
  courseParent: {
    display: 'flex',
    flexDirection: 'row',
    margin: 1,
  },
  courseTime: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  courseCard: {
    flex: 10,
    justifyContent: 'center',
  },
  modalContainer: {
    padding: 20,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 5,
  },
});
