import { Day } from './types';

interface ISubsectionTiming {
  subsection: ISubsectionToCourse;
  timing: {
    startTime: number;
    endTime: number;
  };
}

export interface User {
  name: string;
  email: string;
  username: string;
  password: string;
  faculty: string;
  major: string;
  year: number;
  schedule?: {
    Monday: ISubsectionTiming[];
    Tuesday: ISubsectionTiming[];
    Wednesday: ISubsectionTiming[];
    Thursday: ISubsectionTiming[];
    Friday: ISubsectionTiming[];
    Saturday: ISubsectionTiming[];
    Sunday: ISubsectionTiming[];
  };
}

export interface Venue {
  name: string;
  geolocation: {
    longitude: {
      x: number;
      y: number;
    };
    latitude: {
      x: number;
      y: number;
    };
  };
}

export interface Course {
  code: string;
  name: string;
  prereqs: Course[];
  desc: string;
  venue: Venue;
  Timeslot: Date[];
}

export interface Major {
  name: string;
  reqs: {
    core: Course[];
    elective: Course[];
  };
}

export interface Schedule {
  courses: Course[];
}

export interface ISchedule {
  day: Day;
  startTime: number;
  endTime: number;
}

export interface ISubsection {
  code: string;
  schedule: ISchedule[];
}

export interface ICourse {
  code: string;
  title: string;
  venue: string;
  subsections: ISubsection[];
}

export interface ISubsectionToCourse {
  code: string;
  belongsToCourse: ICourse;
  schedule: ISchedule[];
}
