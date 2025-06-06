import mongoose from 'mongoose';
import { Student } from './student-model';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';
import { User } from '../user/user-model';
import { TStudent } from './student-interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchAbleFields } from './student-const';

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  //-------------- name and email diye filtering     alll comment demo

  // const queryObj = { ...query };
  // const studentSearchAbleFields = ['email', 'name.firstName', 'presentAddress'];
  // let searchTerm = '';
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }
  // const searchQuery = Student.find({
  //   $or: studentSearchAbleFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  //--------------- filtering

  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  // excludeFields.forEach((el) => delete queryObj[el]);
  // console.log({ query }, queryObj);
  // const filterQuery = searchQuery.find(queryObj).populate('admissionSemester');

  // -------sorting

  // let sort = '-createdAt';
  // if (query.sort) {
  //   sort = query.sort as string;
  // }
  // const sortQuery = filterQuery.sort(sort);

  // ---------------pagination

  // let page = 1;
  // let limit = 1;
  // let skip = 0;

  // if (query.limit) {
  //   limit = Number(query.limit);
  // }

  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }

  // const paginateQuery = sortQuery.skip(skip);
  // const limitQuery = paginateQuery.limit(limit);

  // ------------fileds limiting

  // let fields = '__v';

  // if (query.fields) {
  //   fields = (query.fields as string).split(',').join(' ');
  // }
  // const fieldQuery =await limitQuery.select(fields);

  // return fieldQuery;

  // industry pretten code
  const studentQuery = new QueryBuilder(Student.find().populate('user'), query)
    .search(studentSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById(id);
  // const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};
const updateStudentFromDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;
  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdateData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdateData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findByIdAndUpdate(id, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });
  // const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

const deletedStudentFromDB = async (id: string) => {
  // transection and rolback
  // session strat
  const session = await mongoose.startSession();
  try {
    // start transection
    session.startTransaction();
    const deletedStudent = await Student.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    // get user _id from deleteStudent
    const userId = deletedStudent.user;
    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }
    await session.commitTransaction();
    await session.endSession;
    return deletedStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const studentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deletedStudentFromDB,
  updateStudentFromDB,
};
