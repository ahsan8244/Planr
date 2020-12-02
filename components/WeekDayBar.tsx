import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

import { weekDays } from '../constants/WeekDays';

const { useState, useEffect } = React;

interface WeekDayType {
  id: number;
  name: string;
}
interface WeekDayWithIconType extends WeekDayType {
  icon: string;
}

const weekDaysList = weekDays as Array<WeekDayType>;
const getIconForWeekday = (id: number): string => `alpha-a-circle-outline`;

export const WeekDayBar: React.FC = ({ currDay, setCurrDay }: any) => {
  const weekDaysListWithIcons = weekDaysList.map(({ id, name }) => ({
    id,
    name,
    icon: getIconForWeekday(id),
  }));

  const [displayWeek, setDisplayWeek] = useState<Array<WeekDayWithIconType>>(
    weekDaysListWithIcons
  );

  useEffect(() => {
    setSelectedDay(currDay);
  }, []);

  const setSelectedDay = (chosen_id: number) => {
    const newDaysOfWeek: Array<WeekDayWithIconType> = weekDaysListWithIcons.map(
      day => {
        const { id, name, icon } = day;
        return id != chosen_id
          ? day
          : {
              id,
              name,
              icon: icon.slice(0, day.icon.lastIndexOf('-')),
            };
      }
    );
    setDisplayWeek(newDaysOfWeek);
    setCurrDay(chosen_id);
  };
  return (
    <View style={styles.container}>
      {displayWeek.map(({ id, icon }) => (
        <IconButton
          key={id}
          icon={icon}
          onPress={() => {
            setSelectedDay(id);
          }}
        />
      ))}
    </View>
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
