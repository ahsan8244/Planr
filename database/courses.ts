import { Course } from "../types";
import { LE1, RHT } from './venues';

export const COMP2119: Course = {
  code: 'COMP2119',
  name: 'Intro to Data Structure and Algorithms',
  prereqs: [],
  desc: 'Intro to DSA',
  venue: RHT,
  Timeslot: []
};

export const COMP3314: Course = {
  code: 'COMP3314',
  name: 'Machine Learning',
  prereqs: [COMP2119],
  desc: 'Intro to machine learning',
  venue: LE1,
  Timeslot: []
};
