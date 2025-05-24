import config from '../../config';
import { TStudent } from '../students/student-interface';
import { Student } from '../students/student-model';
import { TUser } from './user-interface';
import { User } from './user-model';

// ei comment kore code bojar jonne rekhe dilam
// const createStudentIntoDB = async (password:string, studentData: TStudent) => {
//   // ------------------built in static method-------------------
// //   if (await Student.isUserExists(studentData.id)) {
// //     throw new Error('user already exists');
// //   }
//   const newUser = await User.create(studentData);
//   return newUser;

//   // ------------create an  instance -------------
//   // const student = new Student(studentData);
//   // if (await student.isUserExists(studentData.id)) {
//   //   throw new Error('user already exists');
//   // }
//   // const newUser = await student.save();  //built in instance method
//   // return newUser;
// };

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given,use deafult password
  userData.password = password || (config.default_pass as string);

  // set student role
  userData.role = 'student';








  

  //set manually generated id
  userData.id = '2030100001';

  //create a user
  const newUser = await User.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    //set id, _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id; //reference _id

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const userServices = {
  createStudentIntoDB,
};
