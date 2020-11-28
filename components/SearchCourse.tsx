import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import { List, Searchbar, Modal, Text, Button } from 'react-native-paper';
import { mockCourses as courses } from '../database';
import { Course } from '../types';

export const SearchCourse = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

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
          .sort((course1, course2) => course1.code > course2.code)
          .map((course, index) => (
            <List.Item
              key={index}
              title={course.code}
              description={course.name}
              onPress={() => {
                setSelectedCourse(course);
                setIsModalVisible(true);
              }}
            />
          ))}
      </ScrollView>
      <Modal
        visible={isModalVisible}
        onDismiss={() => setIsModalVisible(false)}
        contentContainerStyle={styles.modalContainer}
      >
        {!selectedCourse ? (
          <Text>Example Modal. Click outside this area to dismiss.</Text>
        ) : (
          <View>
            <Text>{selectedCourse.code}</Text>
            <Text>{selectedCourse.name}</Text>
            <Text>{selectedCourse.venue.name}</Text>
            <Button mode="contained" style={{ marginTop: 30 }}>
              Add to schedule
            </Button>
          </View>
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  modalContainer: {
    padding: 20,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 5,
  },
});
