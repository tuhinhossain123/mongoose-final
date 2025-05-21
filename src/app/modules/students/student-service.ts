import { TStudent } from './student-interface';
import { studentModel } from './student-model';

const createStudentIntoDB = async (student: TStudent) => {
  const result = await studentModel.create(student);
  return result;
};

export const studentServices = {
  createStudentIntoDB,
};
