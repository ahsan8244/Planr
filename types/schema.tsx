export interface User {
  name: string;
  email: string;
  username: string;
  password: string;
  major: string;
  year: number;
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
  day: string;
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
