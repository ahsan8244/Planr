import React, { useContext, useEffect, useState } from 'react';

import { DayPlanner, WeekDayBar, Text, View } from '../components';
import { Day, User } from '../types';
import { ISubsectionTiming } from './ScheduleOptions';
import { firebase } from '../firebase';
import { UserContext } from '../context';

interface IUserSchedule {
  Monday: ISubsectionTiming[];
  Tuesday: ISubsectionTiming[];
  Wednesday: ISubsectionTiming[];
  Thursday: ISubsectionTiming[];
  Friday: ISubsectionTiming[];
  Saturday: ISubsectionTiming[];
  Sunday: ISubsectionTiming[];
}

export const MyPlanr: React.FC = () => {
  const { user } = useContext(UserContext);

  const [currDay, setCurrDay] = useState<Day>('Monday');
  const [loading, setLoading] = useState(false);
  const [userSchedule, setUserSchedule] = useState<IUserSchedule>();

  //@ts-ignore
  const db = firebase.firestore();

  useEffect(() => {
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
  }, []);

  const onCourseClick = () => {};

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
    </>
  );
};
