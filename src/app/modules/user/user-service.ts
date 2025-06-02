import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academic-semister/academic-semister-model';
import { TStudent } from '../students/student-interface';
import { Student } from '../students/student-model';
import { TUser } from './user-interface';
import { User } from './user-model';
import {
  generateAdminId,
  generatedStudentId,
  generateFacultyId,
} from './user-utlis';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';
import { TFaculty } from '../faculty/faculty-interface';
import { AcademicDepartment } from '../academic-department/academic-department-model';
import { Faculty } from '../faculty/faculty-model';
import { Admin } from '../admin/admin-model';
import { verifyToken } from '../auth/auth-utils';

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

// create student
const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given,use deafult password
  userData.password = password || (config.default_pass as string);

  // set student role
  userData.role = 'student';
  userData.email = payload.email;

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
    throw new Error('failed to create student');
  }
};

// create faculty
const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = 'faculty';
  userData.email = payload.email;

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

// create admin

const createAdminIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = 'admin';
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getMe = async (userId: string, role: string) => {
  // const decoded = verifyToken(token, config.jwt_access_secret as string);
  // const { userId, role } = decoded;
  let result = null;
  if (role === 'student') {
    result = await Student.findOne({ id: userId }).populate('user');
  }
  if (role === 'faculty') {
    result = await Faculty.findOne({ id: userId }).populate('user');
  }
  if (role === 'admin') {
    result = await Admin.findOne({ id: userId }).populate('user');
  }

  return result;
};


const chageStatus = async(id:string, payload:{status:string})=>{
  const result = await User.findByIdAndUpdate(id,payload,{new:true})
  return result
}

export const userServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMe,
  chageStatus
};
