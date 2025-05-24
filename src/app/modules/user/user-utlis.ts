import { TAcademicSemester } from '../academic-semister/academic-semister-interface';

// year semesterCode 4 digits numbers
export const generatedStudentId = (payload: TAcademicSemester) => {
  const currentId = (0).toString();
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};
