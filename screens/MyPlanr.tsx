import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-native-paper';
import { StyleSheet } from 'react-native';

import { DayPlanner, WeekDayBar, Text, View } from '../components';
import { Day, User } from '../types';
import { ISubsectionTiming, ILocation } from './ScheduleOptions';
import { firebase } from '../firebase';
import { UserContext } from '../context';
import { GoToMap } from './ScheduleOptions';

interface IUserSchedule {
  Monday: ISubsectionTiming[];
  Tuesday: ISubsectionTiming[];
  Wednesday: ISubsectionTiming[];
  Thursday: ISubsectionTiming[];
  Friday: ISubsectionTiming[];
  Saturday: ISubsectionTiming[];
  Sunday: ISubsectionTiming[];
}

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}

export const MyPlanr: React.FC = ({ navigation }) => {
  const { user } = useContext(UserContext);

  const forceUpdate = useForceUpdate();

  const [currDay, setCurrDay] = useState<Day>('Monday');
  const [loading, setLoading] = useState(false);
  const [userSchedule, setUserSchedule] = useState<IUserSchedule>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [
    selectedCourse,
    setSelectedCourse,
  ] = useState<ISubsectionTiming | null>(null);
  const [locations, setLocations] = useState<Array<ILocation> | null>([]);

  const onCourseClick = (course: ISubsectionTiming) => {
    setSelectedCourse(course);
    setIsModalVisible(true);
  };

  //@ts-ignore
  const db = firebase.firestore();

  useEffect(() => {
    navigation.addListener('didFocus', (payload: any) => {
      console.log(payload);
      forceUpdate();
    });

    const fetchSchedule = async () => {
      const userRef = db
        .collection('users')
        .where('username', '==', user?.username);

      setLoading(true);
      const snapshot = await userRef.get();

      if (!snapshot.empty) {
        const data: User = snapshot.docs[0].data();
        if (data.schedule) {
          setUserSchedule(data.schedule);
        }
      }
      setLoading(false);
    };

    fetchSchedule();
  }, [user]);

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

  if (loading) {
    return (
      <>
        <Text>Loading...</Text>
      </>
    );
  }

  if (!userSchedule) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 18 }}>
          Go to the Generate tab to create your planr
        </Text>
      </View>
    );
  }

  return (
    <>
      <WeekDayBar setCurrDay={setCurrDay} />
      <DayPlanner
        onCourseClick={onCourseClick}
        dayPlan={userSchedule[currDay]}
      />
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
  modalContainer: {
    padding: 20,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 5,
  },
});
