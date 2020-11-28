import * as React from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';

const { useState, useEffect } = React;

import { DayPlanner } from '../components/DayPlanner';

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

const WeeklySchedule = () => {
  const [daysOfWeek, setDaysOfWeek] = useState<Array<WeekDayType>>(weekDays);
  const [currDay, setCurrDay] = useState<number>(-1);

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
  };

  useEffect(() => {
    let todayDay = new Date();
    setCurrDay(todayDay.getDay());
    setSelectedDay(currDay);
  }, []);

  return (
    <>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        {daysOfWeek.map(({ id, icon }) => (
          <IconButton key={id} icon={icon} onPress={() => setSelectedDay(id)} />
        ))}
      </View>
      <DayPlanner />
    </>
  );
};

export default WeeklySchedule;
