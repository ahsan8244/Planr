import { Course } from '../types';
import { LE1, RHT, MWT1, MWT2, CPD1 } from './venues';

export const MATH1853: Course = {
  code: 'MATH1853',
  name: 'Linear Algebra and Probability',
  prereqs: [],
  desc: '',
  venue: RHT,
  Timeslot: [],
};

export const MATH1851: Course = {
  code: 'MATH1851',
  name: 'Calculus and Ordinary Differential Equations',
  prereqs: [],
  desc: '',
  venue: LE1,
  Timeslot: [],
};

export const ENGG1340: Course = {
  code: 'ENGG1340',
  name: 'Computer Programming II',
  prereqs: [],
  desc: '',
  venue: RHT,
  Timeslot: [],
};

export const ENGG1330: Course = {
  code: 'ENGG1330',
  name: 'Computer Programming I',
  prereqs: [],
  desc: '',
  venue: CPD1,
  Timeslot: [],
};

export const COMP2119: Course = {
  code: 'COMP2119',
  name: 'Intro to Data Structure and Algorithms',
  prereqs: [],
  desc: 'Intro to DSA',
  venue: RHT,
  Timeslot: [],
};

export const COMP2120: Course = {
  code: 'COMP2120',
  name: 'Computer Organization',
  prereqs: [ENGG1340],
  desc: 'Intro to DSA',
  venue: RHT,
  Timeslot: [],
};

export const COMP3314: Course = {
  code: 'COMP3314',
  name: 'Machine Learning',
  prereqs: [COMP2119],
  desc: 'Intro to machine learning',
  venue: LE1,
  Timeslot: [],
};

export const COMP3340: Course = {
  code: 'COMP3340',
  name: 'Applied Deep Learning',
  prereqs: [MATH1851, MATH1853],
  desc: '',
  venue: LE1,
  Timeslot: [],
};

export const COMP3330: Course = {
  code: 'COMP3330',
  name: 'Interactive Mobile Application Programming and design',
  prereqs: [],
  desc: '',
  venue: LE1,
  Timeslot: [],
};

export const COMP2121: Course = {
  code: 'COMP2121',
  name: 'Discrete Mathematics',
  prereqs: [MATH1853],
  desc: '',
  venue: MWT1,
  Timeslot: [],
};

export const ACCT1011: Course = {
  code: 'ACCT1011',
  name: 'Introductory Financial Accounting',
  prereqs: [],
  desc: '',
  venue: MWT1,
  Timeslot: [],
};

export const ECON1210: Course = {
  code: 'ECON1210',
  name: 'Introduction to Microeconomics',
  prereqs: [],
  desc: '',
  venue: MWT1,
  Timeslot: [],
};

export const STAT1603: Course = {
  code: 'STAT1603',
  name: 'Introductory Statistics',
  prereqs: [],
  desc: '',
  venue: MWT2,
  Timeslot: [],
};

export const mockCourses: Course[] = [
  COMP2119,
  COMP2120,
  COMP2121,
  COMP3314,
  COMP3330,
  COMP3340,
  ENGG1330,
  ENGG1340,
  MATH1853,
  MATH1851,
  ACCT1011,
  ECON1210,
  STAT1603,
];
