import * as React from 'react';
import { ScrollView, View as DefaultView, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';

import { Text, View } from './Themed';

const course = {
  code: 'COMP3330',
  name: 'Interactive Mobile Application Programming and Design',
  venue: {
    name: 'Some Venue',
  },
};

export const DayPlanner = ({ onCourseClick }: { onCourseClick: any }) => {
  return (
    <DefaultView>
      <ScrollView>
        {[1, 2, 3, 4].map(index => (
          <DefaultView key={index} style={styles.courseParent}>
            <DefaultView style={styles.courseTime}>
              <Text>11:00</Text>
              <Text>12:00</Text>
            </DefaultView>
            <View style={styles.courseCard}>
              <List.Item
                title={course.code}
                description={course.name}
                onPress={() => onCourseClick(course)}
              />
            </View>
          </DefaultView>
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
