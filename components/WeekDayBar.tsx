import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
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

export const WeekDayBar: React.FC = ({ currDay, setCurrDay }: any) => {
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
    setSelectedDay(currDay);
  }, []);

  const setSelectedDay = (chosen_id: string) => {
    const newDisplayWeek: WeekDayWithIconType = weekDaysListWithIcons;
    newDisplayWeek[chosen_id].icon = newDisplayWeek[chosen_id].icon.slice(
      0,
      newDisplayWeek[chosen_id].icon.lastIndexOf('-')
    );

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
            setCurrDay(id);
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
