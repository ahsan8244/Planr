import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { List, Searchbar, Modal, Text, Button } from 'react-native-paper';

import { mockCourses as courses } from '../database';
import { Course } from '../types';

export const SearchCourse = ({ pastCourses, setPastCourses }: any) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  return (
    <>
      <Searchbar
        placeholder={'Search for a course'}
        value={searchQuery}
        onChangeText={query => setSearchQuery(query)}
      />
      <ScrollView style={{ maxHeight: '100%' }}>
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
            <Button
              mode="contained"
              style={{ marginTop: 30 }}
              onPress={() => {
                (async () => {
                  setPastCourses([...pastCourses, selectedCourse]);
                  await AsyncStorage.setItem(
                    '@past_courses',
                    JSON.stringify([...pastCourses, selectedCourse])
                  );
                  setIsModalVisible(false);
                })();
              }}
            >
              Add to past courses
            </Button>
          </View>
        )}
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    padding: 20,
    margin: 10,
    borderRadius: 5,
  },
});
