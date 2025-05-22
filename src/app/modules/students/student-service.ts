import { TStudent } from './student-interface';
import { Student } from './student-model';

const createStudentIntoDB = async (studentData: TStudent) => {
  // ------------------built in static method-------------------
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('user already exists');
  }
  const result = await Student.create(studentData);
  return result;

  // ------------create an  instance -------------
  // const student = new Student(studentData);
  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('user already exists');
  // }
  // const result = await student.save();  //built in instance method
  // return result;
};

const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const studentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
};
