import { academicSemesterNameCodeMapper } from './academic-semister-const';
import { TAcademicSemester} from './academic-semister-interface';
import { AcademicSemester } from './academic-semister-model';


const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // ek semester er name diye onno semester er code diye jno semester create na korte pare tar jonno validation check here
 
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('invalid semester code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

export const academicSemesterServices = {
  createAcademicSemesterIntoDB,
};
