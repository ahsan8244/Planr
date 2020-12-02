import * as React from 'react';
import { StyleSheet, Button } from 'react-native';

import { LinkToMap, Text, View } from '../components';

export const TabTwoScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button
        title="Go to Weekly Schedule"
        onPress={() => navigation.navigate('WeeklySchedule')}
      />
      <LinkToMap />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
