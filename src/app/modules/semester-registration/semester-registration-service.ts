import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/appError';
import { AcademicSemester } from '../academic-semister/academic-semister-model';
import { RegistrationStatus } from './semester-registration-const';
import { TSemesterRegistration } from './semester-registration-interface';
import { SemesterRegistration } from './semester-registration-model';
import httpStatus from 'http-status';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  // check if there any registered semester that is alredy  "UPCOMING", "ONGOING"
  const isThereAnyUpComingOrOnGoingSemester =
    await SemesterRegistration.findOne({
      $or: [
        { status: RegistrationStatus.UPCOMING },
        { status: RegistrationStatus.ONGOING },
      ],
    });
  if (isThereAnyUpComingOrOnGoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an ${isThereAnyUpComingOrOnGoingSemester.status} register semester`,
    );
  }

  // cheack if the semester is exists
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This academic semester not found',
    );
  }

  // cheack if the semester is already registered
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(httpStatus.CONFLICT, 'This semester is already exists');
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result =
    await SemesterRegistration.findById(id).populate('academicSemester');
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  // check if the requested registered semester is exists
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);

  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This semester is not found');
  }

  //   if the semester requested semester registration is ended, we wii not update anything
  const currentSemesterSatus = isSemesterRegistrationExists.status;
  const requestedStatus = payload?.status;

  if (currentSemesterSatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There semester is already  ${currentSemesterSatus} `,
    );
  }

  //   UPCOMING--->ONGOING---->ENDED
  if (
    currentSemesterSatus === RegistrationStatus.UPCOMING &&
    requestedStatus === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `you can't directly change status from ${currentSemesterSatus} to ${requestedStatus}`,
    );
  }
  if (
    currentSemesterSatus === RegistrationStatus.ONGOING &&
    requestedStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `you can't directly change status from ${currentSemesterSatus} to ${requestedStatus}`,
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
