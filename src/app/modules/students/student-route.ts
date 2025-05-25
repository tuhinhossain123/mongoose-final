import express from 'express';
import { studentControllers } from './student-controller';
import validateRequest from '../../middleware/validateRequest';
import { updateStudentValidationSchema } from './student-validation';

const router = express.Router();
router.get('/', studentControllers.getAllStudents);
router.get('/:studentId', studentControllers.getSingleStudents);
router.patch(
  '/:studentId',
  validateRequest(updateStudentValidationSchema),
  studentControllers.updateStudent,
);
router.delete('/:studentId', studentControllers.deleteStudents);

export const studentsRoutes = router;
