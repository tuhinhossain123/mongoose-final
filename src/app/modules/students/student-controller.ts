import { NextFunction, Request, Response } from 'express';
import { studentServices } from './student-service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await studentServices.getAllStudentFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'students are retrived successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const getSingleStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getSingleStudentFromDB(studentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'student is retrived successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const deleteStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.deletedStudentFromDB(studentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'student is deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const studentControllers = {
  getAllStudents,
  getSingleStudents,
  deleteStudents,
};
