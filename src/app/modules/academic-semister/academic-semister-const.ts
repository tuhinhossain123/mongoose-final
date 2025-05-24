import {
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TMonths,
  TSemesterNameCodeMapper,
} from './academic-semister-interface';

export const Months: TMonths[] = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const AcademicSemesterName: TAcademicSemesterName[] = [
  'Autumn',
  'Summar',
  'Fall',
];

export const AcademicSemesterCode: TAcademicSemesterCode[] = ['01', '02', '03'];


 export const academicSemesterNameCodeMapper: TSemesterNameCodeMapper = {
    Autumn: '01',
    Summar: '02',
    Fall: '03',
  };