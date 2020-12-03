import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

import { weekDays as weekDaysList } from '../constants/WeekDays';

const { useState, useEffect } = React;

interface WeekDayWithIconType {
  [id: string]: {
    name: string;
    icon: string;
  };
}

const getIconForWeekday = (id: string): string =>
  `alpha-${weekDaysList[id].name[0].toLowerCase()}-circle-outline`;

export const WeekDayBar: React.FC = ({ setCurrDay }: any) => {
  const weekDaysListWithIcons = Object.keys(weekDaysList).reduce(
    (acc, id) => ({
      ...acc,
      [id]: {
        name: weekDaysList[id].name,
        icon: getIconForWeekday(id),
      },
    }),
    {}
  ) as WeekDayWithIconType;

  const [displayWeek, setDisplayWeek] = useState<WeekDayWithIconType>(
    weekDaysListWithIcons
  );

  useEffect(() => {
    const numberToWeekday: {
      [id: string]: string;
    } = {
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday',
    };

    const today: string = new Date().getDay().toString();
    setSelectedDay(numberToWeekday[today]);
  }, []);

  const setSelectedDay = (chosen_id: string) => {
    const newDisplayWeek: WeekDayWithIconType = weekDaysListWithIcons;
    newDisplayWeek[chosen_id].icon = newDisplayWeek[chosen_id].icon.slice(
      0,
      newDisplayWeek[chosen_id].icon.lastIndexOf('-')
    );

    setCurrDay(chosen_id);
    setDisplayWeek(newDisplayWeek);
  };

  return (
    <View style={styles.container}>
      {Object.keys(displayWeek).map(id => (
        <IconButton
          key={id}
          icon={displayWeek[id].icon}
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
