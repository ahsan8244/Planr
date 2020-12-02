import * as React from 'react';
import { ScrollView, View as DefaultView, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';

import { ISubsectionTiming } from '../screens/ScheduleOptions';
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

const CourseComponent = ({
  course,
  onCourseClick,
}: {
  course: ISubsectionTiming;
  onCourseClick: any;
}) => (
  <DefaultView style={styles.courseParent}>
    <DefaultView style={styles.courseTime}>
      <Text>{course.timing.startTime}</Text>
      <Text>{course.timing.endTime}</Text>
    </DefaultView>
    <View style={styles.courseCard}>
      <List.Item
        title={course.subsection.belongsToCourse.code}
        description={course.subsection.belongsToCourse.title}
        onPress={() => onCourseClick(course)}
      />
    </View>
  </DefaultView>
);

export const DayPlanner = ({
  onCourseClick,
  dayPlan,
}: {
  onCourseClick: any;
  dayPlan: ISubsectionTiming[];
}) => {
  return (
    <DefaultView>
      <ScrollView>
        {dayPlan
          .sort(
            (class1, class2) =>
              class1.timing.startTime - class2.timing.startTime
          )
          .map((classInfo, idx) => (
            <CourseComponent
              key={idx}
              course={classInfo}
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
