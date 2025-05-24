import { TAcademicSemester } from './academic-semister-interface';
import { AcademicSemester } from './academic-semister-model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  const result = await AcademicSemester.create(payload);
  return result;
};

export const academicSemesterServices = {
  createAcademicSemesterIntoDB,
};
