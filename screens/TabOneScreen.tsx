import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import { SearchCourse } from '../components/SearchCourse';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <SearchCourse />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
