import { TStudent } from './student-interface';
import { studentModel } from './student-model';

const createStudentIntoDB = async (student: TStudent) => {
  const result = await studentModel.create(student);
  return result;
};

const getAllStudentFromDB = async () => {
  const result = await studentModel.find();
  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  const result = await studentModel.findOne({ id });
  return result;
};

export const studentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
};
