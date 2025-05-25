import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academic-semister/academic-semister-model';
import { TStudent } from '../students/student-interface';
import { Student } from '../students/student-model';
import { TUser } from './user-interface';
import { User } from './user-model';
import { generatedStudentId } from './user-utlis';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';

// ei comment kore code bojar jonne rekhe dilam
// const createStudentIntoDB = async (password:string, payload: TStudent) => {
//   // ------------------built in static method-------------------
// //   if (await Student.isUserExists(payload.id)) {
// //     throw new Error('user already exists');
// //   }
//   const newUser = await User.create(payload);
//   return newUser;

//   // ------------create an  instance -------------
//   // const student = new Student(payload);
//   // if (await student.isUserExists(payload.id)) {
//   //   throw new Error('user already exists');
//   // }
//   // const newUser = await student.save();  //built in instance method
//   // return newUser;
// };

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given,use deafult password
  userData.password = password || (config.default_pass as string);

  // set student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  // ei khaner nicher code amra try block a rakhbo and ekan thekei transection use korbo

  // start session
  const session = await mongoose.startSession();
  try {
    // start transection
    session.startTransaction();
    //set  generated id
    userData.id = await generatedStudentId(admissionSemester);

    //create a user (transection-1)  ekhane userdata object hisebe chilo but transection use korar karone array hisebe dite hoice
    const newUser = await User.create([userData], { session });

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    //set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    //create a student (transection-2)
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    // upore 2 ta data success vabe create hole ekhane session ta commit  kore dite hbe
    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession;
  }
};

export const userServices = {
  createStudentIntoDB,
};
