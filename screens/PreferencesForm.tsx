import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
  TextInput,
  Button,
  Title,
  Dialog,
  Portal,
  Paragraph,
} from 'react-native-paper';
//@ts-ignore
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import { Text } from '../components';
import { firebase } from '../firebase';
import { ICourse } from '../types';
import { getPossibleTimetables } from '../utils';
import { StackScreenProps } from '@react-navigation/stack';
import { GenerateStackParamList } from '../navigation/BottomTabNavigator';

const { useEffect, useState } = React;

interface ICoursePrefsDict {
  [key: string]: string;
}

const arePreferencesComplete = (
  courseCodes: ICoursePrefsDict,
  numCoursesNeeded: number
) => {
  if (Object.keys(courseCodes).length < numCoursesNeeded) {
    return false;
  }

  Object.keys(courseCodes).forEach(key => {
    if (!courseCodes[key] || courseCodes[key] == '') {
      return false;
    }
  });

  return true;
};

const getCourseDataForPrefs = (
  prefs: ICoursePrefsDict,
  courseData: ICourse[]
): ICourse[] => {
  const codesAsKeys = Object.keys(prefs).reduce(
    (codes, key) => ({ ...codes, [prefs[key]]: key }),
    {} as ICoursePrefsDict
  );
  return courseData.filter(course => course.code in codesAsKeys);
};

export const PreferencesForm: React.FC<
  StackScreenProps<GenerateStackParamList>
> = ({ navigation }) => {
  const [courses, setCourses] = useState<ICourse[]>();
  const [numCourses, setNumCourses] = useState<number>();
  const [courseCodePrefs, setCourseCodePrefs] = useState<ICoursePrefsDict>({});
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
      <Portal>
        <Dialog
          visible={showErrorDialog}
          onDismiss={() => {
            setShowErrorDialog(false);
            setErrorMessage('');
          }}
        >
          <Dialog.Title>🤔</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{errorMessage}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setShowErrorDialog(false);
                setErrorMessage('');
              }}
            >
              OK
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Button
        style={{ marginTop: 12 }}
        onPress={async () => {
          if (numCourses && numCourses > 0) {
            if (arePreferencesComplete(courseCodePrefs, numCourses)) {
              const courseData = getCourseDataForPrefs(
                courseCodePrefs,
                courses
              );
              if (courseData.length < Object.keys(courseCodePrefs).length) {
                setErrorMessage(
                  'Oops! One or more of your preferences are non-existent in our database'
                );
                setShowErrorDialog(true);
              } else {
                const possibleTimetables = getPossibleTimetables(
                  courseData,
                  numCourses
                );
                if (!possibleTimetables.length) {
                  setErrorMessage(
                    'No possible schedule! Try changing your course preferences!'
                  );
                  setShowErrorDialog(true);
                } else {
                  navigation.navigate('ScheduleOptions', {
                    generatedSchedules: possibleTimetables,
                  });
                }
              }
            } else {
              setErrorMessage('please fill all your preferences');
              setShowErrorDialog(true);
            }
          } else {
            setErrorMessage('pick a number of courses you need');
            setShowErrorDialog(true);
          }
        }}
      >
        Generate
      </Button>
      <TextInput
        keyboardType="numeric"
        mode="outlined"
        returnKeyType="done"
        placeholder="how many courses do you want to take?"
        style={{ margin: 12 }}
        onChangeText={text => {
          setNumCourses(parseInt(text));
        }}
      />
      <Title style={{ margin: 12 }}>Course Preferences</Title>
      <KeyboardAwareScrollView style={{ paddingLeft: 12, paddingRight: 12 }}>
        {numCourses ? (
          Array(numCourses)
            .fill(0)
            .map((_, idx) => (
              <TextInput
                key={idx}
                mode="outlined"
                returnKeyType="done"
                value={courseCodePrefs !== {} ? courseCodePrefs[idx] : ''}
                placeholder="Course code"
                style={{ marginBottom: 12 }}
                autoCapitalize="characters"
                onChangeText={text => {
                  const prefs: ICoursePrefsDict = {
                    ...Object.assign({}, courseCodePrefs),
                    [idx]: text,
                  };
                  if (text === '') {
                    delete prefs[idx];
                  }
                  setCourseCodePrefs(prefs);
                }}
              />
            ))
        ) : (
          <Text>Set the number of courses you wish to take first</Text>
        )}
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
