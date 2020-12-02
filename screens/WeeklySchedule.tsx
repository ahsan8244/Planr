import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, Modal } from 'react-native-paper';

const { useState, useEffect } = React;

import { DayPlanner, Text, LinkToMap } from '../components';

interface WeekDayType {
  id: number;
  icon: string;
}

const weekDays: Array<WeekDayType> = [
  {
    id: 1,
    icon: 'alpha-m-circle-outline',
  },
  {
    id: 2,
    icon: 'alpha-t-circle-outline',
  },
  {
    id: 3,
    icon: 'alpha-w-circle-outline',
  },
  {
    id: 4,
    icon: 'alpha-t-circle-outline',
  },
  {
    id: 5,
    icon: 'alpha-f-circle-outline',
  },
  {
    id: 6,
    icon: 'alpha-s-circle-outline',
  },
  {
    id: 7,
    icon: 'alpha-s-circle-outline',
  },
];

export const WeeklySchedule = () => {
  const [daysOfWeek, setDaysOfWeek] = useState<Array<WeekDayType>>(weekDays);
  const [currDay, setCurrDay] = useState<number>(new Date().getDay());
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const setSelectedDay = (chosen_id: number) => {
    const newDaysOfWeek: Array<WeekDayType> = weekDays.map(day => {
      const { id, icon } = day;
      return id != chosen_id
        ? day
        : {
            id,
            icon: icon.slice(0, day.icon.lastIndexOf('-')),
          };
    });
    setDaysOfWeek(newDaysOfWeek);
    setCurrDay(chosen_id);
  };

  const onCourseClick = (course: any) => {
    setSelectedCourse(course);
    setIsModalVisible(true);
  };

  useEffect(() => {
    setSelectedDay(currDay);
  }, []);

  return (
    <>
      <View style={styles.container}>
        {daysOfWeek.map(({ id, icon }) => (
          <IconButton
            key={id}
            icon={icon}
            onPress={() => {
              setSelectedDay(id);
            }}
          />
        ))}
      </View>
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
