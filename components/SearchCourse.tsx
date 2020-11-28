import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import { List, Searchbar } from 'react-native-paper';
import { mockCourses as courses } from '../database';

export const SearchCourse = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder={'Search for a course'}
        value={searchQuery}
        onChangeText={query => setSearchQuery(query)}
      />
      <ScrollView>
        {courses
          .filter(
            ({ code, name }, _) =>
              code.toLowerCase().includes(searchQuery.toLowerCase()) ||
              name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map(({ code, name }, index) => (
            <List.Item key={index} title={code} description={name} />
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
