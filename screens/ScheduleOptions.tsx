import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Modal, Button } from 'react-native-paper';

const { useState, useEffect, useContext } = React;

import { DayPlanner, Text, LinkToMap, WeekDayBar } from '../components';
import { GenerateStackParamList } from '../navigation/BottomTabNavigator';
import { Day, ISubsectionToCourse } from '../types';
import { firebase } from '../firebase';
import { UserContext } from '../context';

export interface ISubsectionTiming {
  subsection: ISubsectionToCourse;
  timing: {
    startTime: number;
    endTime: number;
  };
}

interface ILocation {
  code: string;
  name: string;
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

//@ts-ignore
const db = firebase.firestore();

const GoToMap = ({
  course,
  locations,
}: {
  course: ISubsectionTiming;
  locations: Array<ILocation>;
}) => {
  const [location, setLocation] = useState<ILocation | null>();

  useEffect(() => {
    const locationCode: string = course?.subsection?.belongsToCourse?.venue?.substr(
      0,
      course?.subsection?.belongsToCourse?.venue?.indexOf(' ')
    );
    const filteredLocations = locations.filter(
      ({ code }) => code == locationCode
    );

    setLocation(filteredLocations[0]);
  }, [course]);

  const locationToURL = (name: string) => name.toLowerCase().replace(' ', '+');
  return location ? (
    <LinkToMap
      text={course?.subsection?.belongsToCourse?.venue}
      url={`https://www.google.com/maps/search/?api=1&query=${locationToURL(
        location.name
      )}`}
    />
  ) : null;
};

export const ScheduleOptions: React.FC<
  StackScreenProps<GenerateStackParamList, 'ScheduleOptions'>
> = ({ route }) => {
  const { generatedSchedules } = route.params;

  const { user, setUser } = useContext(UserContext);
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
  const [locations, setLocations] = useState<Array<ILocation> | null>();

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
  }, [currClassesMappedToDays, currDay]);

  useEffect(() => {
    currClassesMappedToDays && setCurrDayPlan(currClassesMappedToDays[currDay]);
  }, [currDay]);

  useEffect(() => {
    const fetchLocations = async () => {
      const coursesRef = db.collection('locations');
      const snapshot = await coursesRef.get();

      if (!snapshot.empty) {
        const data = snapshot.docs.map((doc: any) => doc.data());
        setLocations(data);
      }
    };
    fetchLocations();
  }, []);

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
            (async () => {
              const userRef = db
                .collection('users')
                .where('username', '==', user.username)
                .limit(1);
              const snapshot = await userRef.get();

              await db
                .collection('users')
                .doc(snapshot.docs[0].id)
                .set({ ...user, schedule: currClassesMappedToDays });
              setUser({ ...user, schedule: currClassesMappedToDays });
              Alert.alert('Successfully added schedule!');
            })();
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
        {locations && selectedCourse && (
          <>
            <Text>{selectedCourse?.subsection?.belongsToCourse?.code}</Text>
            <Text numberOfLines={1}>
              {selectedCourse?.subsection?.belongsToCourse?.title}
            </Text>
            <GoToMap course={selectedCourse} locations={locations} />
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
