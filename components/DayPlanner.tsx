import * as React from 'react';
import { Avatar, Card, Divider } from 'react-native-paper';
import { View, ScrollView } from 'react-native';

import { Text } from './Themed';

const centuryStart = new Date('2000-01-01T08:00:00');

export const DayPlanner = () => {
  const increamentTime = (amount: number) => {
    const increasedDate = new Date(centuryStart.getTime() + amount * 60000);

    let hour = increasedDate.getUTCHours().toString();
    let minute = '0' + increasedDate.getUTCMinutes().toString();
    return `${hour}:${minute.substr(minute.length - 2)}`;
  };

  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

  return (
    <ScrollView>
      {[1, 2, 3, 3].map(time => (
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View
            style={{
              flex: 2,
              margin: 10,
              justifyContent: 'center',
            }}
          >
            <Text style={{ padding: 5, fontWeight: 'bold' }}>11:00</Text>
            <Text style={{ padding: 5, fontWeight: 'bold' }}>12:00</Text>
          </View>
          <Card style={{ flex: 11, margin: 10 }}>
            <Card.Title
              title="Card Title"
              subtitle="Card Subtitle"
              left={LeftContent}
            />
          </Card>
        </View>
      ))}
    </ScrollView>
  );
};
