import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  List,
  Searchbar,
  Modal,
  Text,
  Button,
  Title,
  Subheading,
} from 'react-native-paper';

import { Course, ICourse } from '../types';
import { firebase } from '../firebase';

export const SearchCourse = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);
  const [courses, setCourses] = useState<ICourse[]>();

  //@ts-ignore
  const db = firebase.firestore();

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesRef = db.collection('courses');
      const snapshot = await coursesRef.get();

      if (!snapshot.empty) {
        const data = snapshot.docs.map((doc: any) => doc.data());
        const dataMappedToArray: ICourse[] = data.map(
          (item: any) => item[Object.keys(item)[0]]
        );
        setCourses(dataMappedToArray);
      }
    };

    fetchCourses();
  }, []);

  if (!courses) {
    return (
      <>
        <Text>Loading...</Text>
      </>
    );
  }

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
            ({ code, title }, _) =>
              code.toLowerCase().includes(searchQuery.toLowerCase()) ||
              title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .sort((course1, course2) => course1.code > course2.code)
          .map((course, index) => (
            <List.Item
              key={index}
              title={course.code}
              description={course.title}
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
            <Title>{selectedCourse.code}</Title>
            <Subheading>{selectedCourse.title}</Subheading>
            <Subheading>{selectedCourse.venue}</Subheading>
            {selectedCourse.link && (
              <Button
                mode="outlined"
                onPress={() => {
                  Linking.openURL(selectedCourse.link);
                }}
              >
                Go to course page
              </Button>
            )}
            <Button
              mode="contained"
              onPress={() => setIsModalVisible(false)}
              style={{ marginTop: 5 }}
            >
              Close
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
    backgroundColor: '#fff',
  },
});
