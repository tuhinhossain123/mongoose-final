import { studentServices } from './student-service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await studentServices.getAllStudentFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'students are retrived successfully',
    data: result,
  });
});

const getSingleStudents = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await studentServices.getSingleStudentFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student is retrived successfully',
    data: result,
  });
});
const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body;
  const result = await studentServices.updateStudentFromDB(id, student);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student is updated successfully',
    data: result,
  });
});

const deleteStudents = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await studentServices.deletedStudentFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student is deleted successfully',
    data: result,
  });
});

export const studentControllers = {
  getAllStudents,
  getSingleStudents,
  deleteStudents,
  updateStudent,
};
