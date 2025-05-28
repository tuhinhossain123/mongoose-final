import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { semesterRegistrationServices } from './semester-registration-service';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationServices.createSemesterRegistrationIntoDB(
      req.body,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semester registratuin is created succesfully',
    data: result,
  });
});

const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationServices.getAllSemesterRegistrationsFromDB(
      req.query,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semester registratuin are retrieved succesfully',
    data: result,
  });
});

const getSinglegeSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await semesterRegistrationServices.getSingleSemesterRegistrationFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semester registratuin is retrieved succesfully',
    data: result,
  });
});

const updategetSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculty } = req.body;
  const result =
    await semesterRegistrationServices.updateSemesterRegistrationIntoDB(
      id,
      faculty,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semester registratuin is updated succesfully',
    data: result,
  });
});

export const semesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSinglegeSemesterRegistration,
  updategetSemesterRegistration,
};
