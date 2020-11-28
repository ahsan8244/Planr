import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View, SearchCourse } from '../components';

export const TabOneScreen = () => (
  <View style={styles.container}>
    <SearchCourse />
  </View>
);

const styles = StyleSheet.create({
  container: {},
});
