import * as React from 'react';
import { ScrollView, View as DefaultView, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';

import { ISubsectionTiming } from '../screens/ScheduleOptions';
import { Text, View } from './Themed';

const formatTime = (num: number) => {
  const stringTime = '0000' + num.toString();
  const timeWithZero = stringTime.slice(stringTime.length - 4);

  const formattedTime = `${timeWithZero.slice(0, 2)}:${timeWithZero.slice(2)}`;
  return formattedTime;
};

const CourseComponent = ({
  course,
  onCourseClick,
}: {
  course: ISubsectionTiming;
  onCourseClick: (course: ISubsectionTiming) => void;
}) => (
  <DefaultView style={styles.courseParent}>
    <DefaultView style={styles.courseTime}>
      <Text>{formatTime(course.timing.startTime)}</Text>
      <Text>{formatTime(course.timing.endTime)}</Text>
    </DefaultView>
    <View style={styles.courseCard}>
      <List.Item
        title={`${course.subsection.belongsToCourse.code} ${course.subsection.code}`}
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
  onCourseClick: (course: ISubsectionTiming) => void;
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
