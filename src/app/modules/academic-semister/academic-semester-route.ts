import express from 'express';
import { academicSemesterControllers } from './academic-semister-controller';
import validateRequest from '../../middleware/validateRequest';
import { academicSemisterValidation } from './academic-semester-validation';

const router = express.Router();
router.post(
  '/create-academic-semester',
  validateRequest(
    academicSemisterValidation.createAcademicSemesterValidationSchema,
  ),
  academicSemesterControllers.createAcademicSemester,
);
// router.get('/', studentControllers.getAllStudents);
// router.get('/:studentId', studentControllers.getSingleStudents);
// router.delete('/:studentId', studentControllers.deleteStudents);

export const academicSemesterRoutes = router;
