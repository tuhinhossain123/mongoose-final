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
router.get(
  '/:semesterId',
  academicSemesterControllers.getSingleAcademicSemester,
);

router.patch(
  '/:semesterId',
  validateRequest(
    academicSemisterValidation.updateAcademicSemesterValidationSchema,
  ),
  academicSemesterControllers.updateAcademicSemester,
);

router.get('/', academicSemesterControllers.getAllAcademicSemesters);

export const academicSemesterRoutes = router;
