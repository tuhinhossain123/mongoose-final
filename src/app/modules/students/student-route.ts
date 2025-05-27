import express from 'express';
import { studentControllers } from './student-controller';
import validateRequest from '../../middleware/validateRequest';
import { updateStudentValidationSchema } from './student-validation';

const router = express.Router();
router.get('/', studentControllers.getAllStudents);
router.get('/:id', studentControllers.getSingleStudents);
router.patch(
  '/:id',
  validateRequest(updateStudentValidationSchema),
  studentControllers.updateStudent,
);
router.delete('/:id', studentControllers.deleteStudents);

export const studentsRoutes = router;
