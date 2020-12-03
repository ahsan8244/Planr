import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal, Button } from 'react-native-paper';

const { useState, useEffect } = React;

import { DayPlanner, Text, LinkToMap, WeekDayBar } from '../components';
import { GenerateStackParamList } from '../navigation/BottomTabNavigator';
import { Day, ISubsectionToCourse } from '../types';

export interface ISubsectionTiming {
  subsection: ISubsectionToCourse;
  timing: {
    startTime: number;
    endTime: number;
  };
}

interface IClassesMappedToDays {
  Monday: ISubsectionTiming[];
  Tuesday: ISubsectionTiming[];
  Wednesday: ISubsectionTiming[];
  Thursday: ISubsectionTiming[];
  Friday: ISubsectionTiming[];
  Saturday: ISubsectionTiming[];
  Sunday: ISubsectionTiming[];
}

export const ScheduleOptions: React.FC<
  StackScreenProps<GenerateStackParamList, 'ScheduleOptions'>
> = ({ route }) => {
  const { generatedSchedules } = route.params;

  const [currDay, setCurrDay] = useState<Day>('Monday');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [
    selectedCourse,
    setSelectedCourse,
  ] = useState<ISubsectionTiming | null>(null);
  const [currScheduleIndex, setCurrScheduleIndex] = useState(0);
  const [currScheduleOption, setCurrScheduleOption] = useState(
    generatedSchedules ? generatedSchedules[currScheduleIndex] : []
  );
  const [
    currClassesMappedToDays,
    setCurrClassesMappedToDays,
  ] = useState<IClassesMappedToDays>();
  const [currDayPlan, setCurrDayPlan] = useState<ISubsectionTiming[]>([]);

  const onCourseClick = (course: ISubsectionTiming) => {
    setSelectedCourse(course);
    setIsModalVisible(true);
  };

  useEffect(() => {
    const classesMappedToDays: IClassesMappedToDays = {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    };

    currScheduleOption.forEach(subsection => {
      subsection.schedule.forEach(dayAndTiming => {
        classesMappedToDays[dayAndTiming.day].push({
          subsection: subsection,
          timing: {
            startTime: dayAndTiming.startTime,
            endTime: dayAndTiming.endTime,
          },
        });
      });
    });

    setCurrClassesMappedToDays(classesMappedToDays);
  }, [currScheduleOption]);

  useEffect(() => {
    currClassesMappedToDays && setCurrDayPlan(currClassesMappedToDays[currDay]);
  }, [currDay]);

  return (
    <>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: 12,
          justifyContent: 'space-between',
        }}
      >
        <Button
          icon="skip-next"
          mode="contained"
          compact
          onPress={() => {
            const nextIndex =
              (currScheduleIndex + 1) % generatedSchedules.length;
            setCurrScheduleIndex(nextIndex);
            setCurrScheduleOption(generatedSchedules[nextIndex]);
          }}
        >
          Next
        </Button>
        <Button
          icon="check"
          mode="contained"
          compact
          color="green"
          onPress={() => {
            //save current schedule selection as user's schedule
            //or we could export it to calendar idk
          }}
        >
          Confirm
        </Button>
      </View>
      <WeekDayBar setCurrDay={setCurrDay} />
      <DayPlanner onCourseClick={onCourseClick} dayPlan={currDayPlan} />
      <Modal
        visible={isModalVisible}
        onDismiss={() => setIsModalVisible(false)}
        contentContainerStyle={styles.modalContainer}
      >
        {selectedCourse && (
          <>
            <Text>{selectedCourse?.subsection?.belongsToCourse?.code}</Text>
            <Text numberOfLines={1}>
              {selectedCourse?.subsection?.belongsToCourse?.title}
            </Text>
            <LinkToMap
              text={selectedCourse?.subsection?.belongsToCourse?.venue}
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
