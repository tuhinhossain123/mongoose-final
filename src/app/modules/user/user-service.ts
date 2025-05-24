import config from '../../config';
import { TAcademicSemester } from '../academic-semister/academic-semister-interface';
import { AcademicSemester } from '../academic-semister/academic-semister-model';
import { TStudent } from '../students/student-interface';
import { Student } from '../students/student-model';
import { TUser } from './user-interface';
import { User } from './user-model';
import { generatedStudentId } from './user-utlis';

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
  const admissionSemester= await AcademicSemester.findById(payload.admissionSemester)


  //set  generated id
  userData.id = generatedStudentId(admissionSemester);

  //create a user
  const newUser = await User.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    //set id, _id as user
    payload.id = newUser.id;
    payload.user = newUser._id; //reference _id

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const userServices = {
  createStudentIntoDB,
};
