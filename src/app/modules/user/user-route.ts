import express, { NextFunction, Request, Response } from 'express';
import { userControllers } from './user-controller';
import validateRequest from '../../middleware/validateRequest';
import { createStudentValidationSchema } from '../students/student-validation';
import { createFacultyValidationSchema } from '../faculty/faculty-validation';
import { createAdminValidationSchema } from '../admin/admin-validation';
import auth from '../../middleware/auth';
import { USER_Role } from './user-const';
import { UserValidation } from './user-validation';
import { upload } from '../../utils/sendImagesToCloudinary';

const router = express.Router();

router.post(
  '/create-student',
  auth(USER_Role.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createStudentValidationSchema),
  userControllers.createStudent,
);

router.post(
  '/create-faculty',
  auth(USER_Role.admin),
  validateRequest(createFacultyValidationSchema),
  userControllers.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  userControllers.createAdmin,
);
router.post(
  '/change-status/:id',
  auth('admin'),
  validateRequest(UserValidation.changeStatusValidationSchema),
  userControllers.changeStatus,
);

router.get('/me', auth('student', 'faculty', 'admin'), userControllers.getMe);

export const userRoutes = router;
