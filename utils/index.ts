import { ICourse, ISchedule, ISubsectionToCourse } from '../types';

interface ICourseScheduleMap {
  [day: string]: {
    startTime: number;
    endTime: number;
  }[];
}

const coursesToSubsections = (courseData: ICourse[]): ISubsectionToCourse[] => {
  const subsectionsToCourseLists = courseData.map(course =>
    course.subsections.map(subsection => ({
      code: subsection.code,
      belongsToCourse: course,
      schedule: subsection.schedule,
    }))
  );

  const flattenedSubsectionsToCourse = subsectionsToCourseLists.reduce(
    (flattened, currCourse) => {
      return flattened.concat(currCourse);
    }
  );

  return flattenedSubsectionsToCourse;
};

const getScheduleMap = (schedule: ISchedule[]): ICourseScheduleMap => {
  return schedule.reduce((map, dayAndTiming) => {
    const currDay = dayAndTiming.day;
    if (currDay in map) {
      map[currDay].push({
        startTime: dayAndTiming.startTime,
        endTime: dayAndTiming.endTime,
      });
    } else {
      map[currDay] = [
        { startTime: dayAndTiming.startTime, endTime: dayAndTiming.endTime },
      ];
    }
    return map;
  }, {} as ICourseScheduleMap);
};

const timingsAreClashing = (
  currCourseTiming: { startTime: number; endTime: number },
  existingTiming: { startTime: number; endTime: number }
): boolean => {
  const { startTime: currStartTime, endTime: currEndTime } = currCourseTiming;
  const {
    startTime: existingStartTime,
    endTime: existingEndTime,
  } = existingTiming;

  if (currStartTime === existingStartTime && currEndTime === existingEndTime) {
    return true;
  }

  if (currStartTime < existingEndTime && currEndTime > existingStartTime) {
    return true;
  }

  return false;
};

const combineSchedules = (
  pickedCourses: ISubsectionToCourse[]
): ISchedule[] => {
  return pickedCourses
    .map(course => course.schedule)
    .reduce((flattened, schedule) => flattened.concat(schedule), []);
};

const isClashing = (
  currCourse: ISubsectionToCourse,
  pickedCourses: ISubsectionToCourse[]
): boolean => {
  const currCourseSchedule = currCourse.schedule;
  const currCourseScheduleMap = getScheduleMap(currCourseSchedule);

  if (pickedCourses) {
    const existingSchedule = combineSchedules(pickedCourses);

    return existingSchedule.some(schedule => {
      if (schedule.day in currCourseScheduleMap) {
        const currCourseDayTimings = currCourseScheduleMap[schedule.day];
        return currCourseDayTimings.some(timing =>
          timingsAreClashing(timing, {
            startTime: schedule.startTime,
            endTime: schedule.endTime,
          })
        );
      }
    });
  } else {
    return false;
  }
};

const generateNonClashingTimeTables = (
  index: number,
  currSelection: ISubsectionToCourse[],
  allOptions: ISubsectionToCourse[],
  numCoursesNeeded: number
): ISubsectionToCourse[][] => {
  if (currSelection.length === numCoursesNeeded) {
    return [currSelection];
  }

  if (index >= allOptions.length) {
    return [];
  }

  const courseToConsider = allOptions[index];

  if (
    !currSelection.some(
      course =>
        course.belongsToCourse.code === courseToConsider.belongsToCourse.code
    ) &&
    !isClashing(courseToConsider, currSelection)
  ) {
    return generateNonClashingTimeTables(
      index + 1,
      currSelection.concat(courseToConsider),
      allOptions,
      numCoursesNeeded
    ).concat(
      generateNonClashingTimeTables(
        index + 1,
        currSelection,
        allOptions,
        numCoursesNeeded
      )
    );
  } else {
    return generateNonClashingTimeTables(
      index + 1,
      currSelection,
      allOptions,
      numCoursesNeeded
    );
  }
};

export const getPossibleTimetables = (
  courseOptions: ICourse[],
  numCoursesNeeded: number
): ISubsectionToCourse[][] => {
  const subsectionsData = coursesToSubsections(courseOptions);

  return generateNonClashingTimeTables(
    0,
    [],
    subsectionsData,
    numCoursesNeeded
  );
};
