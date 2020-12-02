import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Modal } from 'react-native-paper';

const { useState } = React;

import { DayPlanner, Text, LinkToMap, WeekDayBar } from '../components';

export const WeeklySchedule = () => {
  const [currDay, setCurrDay] = useState<number>(new Date().getDay());
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const onCourseClick = (course: any) => {
    setSelectedCourse(course);
    setIsModalVisible(true);
  };

  return (
    <>
      <WeekDayBar currDay={currDay} setCurrDay={setCurrDay} />

      <DayPlanner onCourseClick={onCourseClick} />
      <Modal
        visible={isModalVisible}
        onDismiss={() => setIsModalVisible(false)}
        contentContainerStyle={styles.modalContainer}
      >
        {selectedCourse && (
          <>
            <Text>{selectedCourse.belongsToCourse.code}</Text>
            <Text numberOfLines={1}>
              {selectedCourse.belongsToCourse.title}
            </Text>
            <LinkToMap
              text={selectedCourse.belongsToCourse.venue}
              url="https://maps.google.com/maps?daddr=38.7875851,-9.3906089"
            />
          </>
        )}
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalContainer: {
    padding: 20,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 5,
  },
});
