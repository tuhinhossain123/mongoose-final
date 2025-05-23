import { NextFunction, Request, Response } from 'express';
import { studentServices } from './student-service';

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await studentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'students are retrived succesfully',
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
    res.status(200).json({
      success: true,
      message: 'students is retrived succesfully',
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
    res.status(200).json({
      success: true,
      message: 'students is deleted succesfully',
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
