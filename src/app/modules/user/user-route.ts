import express from 'express';
import { userControllers } from './user-controller';
import validateRequest from '../../middleware/validateRequest';
import { createStudentValidationSchema } from '../students/student-validation';
import { createFacultyValidationSchema } from '../faculty/faculty-validation';
import { createAdminValidationSchema } from '../admin/admin-validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  userControllers.createStudent,
);

router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  userControllers.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  userControllers.createAdmin,
);

export const userRoutes = router;
