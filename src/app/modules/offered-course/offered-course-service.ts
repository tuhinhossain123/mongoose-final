import AppError from '../../errors/appError';
import { AcademicDepartment } from '../academic-department/academic-department-model';
import { AcademicFaculty } from '../academic-faculty/academic-faculty-model';
import { Course } from '../course/course-model';
import { Faculty } from '../faculty/faculty-model';
import { SemesterRegistration } from '../semester-registration/semester-registration-model';
import { TOfferedCourse } from './offered-course-interface';
import { OfferedCourse } from './offered-course-model';
import httpStatus from 'http-status';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
  } = payload;

  // check if the semester registration id is exists
  const isSemesterRegiatrationExits =
    await SemesterRegistration.findById(semesterRegistration);
  if (!isSemesterRegiatrationExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'semester registration not found');
  }
  const academicSemester = isSemesterRegiatrationExits.academicSemester;

  const isAcademicFacultyExits =
    await AcademicFaculty.findById(academicFaculty);
  if (!isAcademicFacultyExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'academic faculty not found');
  }

  const isAcademicDepartmentExits =
    await AcademicDepartment.findById(academicDepartment);
  if (!isAcademicDepartmentExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'academic department not found');
  }

  const isCoursesExits = await Course.findById(course);
  if (!isCoursesExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'course not found');
  }

  const isfacultyExits = await Faculty.findById(faculty);
  if (!isfacultyExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'faculty not found');
  }
  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

const getAllOfferedCoursesFromDB = async () => {
  const result = await OfferedCourse.find();
  return result;
};

const getSingleOfferedCourseFromDB = async (id: string) => {
  const result = await OfferedCourse.findById(id);
  return result;
};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Partial<TOfferedCourse>,
) => {
  const result = await OfferedCourse.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const offeredCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
};
