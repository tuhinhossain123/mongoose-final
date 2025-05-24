import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { academicFacultyControllers } from './academic-faculty-controller';
import { AcademicFacultyValidation } from './academic-faculty-validation';

const router = express.Router();
router.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  academicFacultyControllers.createAcademicFaculty,
);
router.get('/:facultyId', academicFacultyControllers.getSingleAcademicFaculty);

router.patch(
  '/:facultyId',
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  academicFacultyControllers.updateAcademicFaculty,
);

router.get('/', academicFacultyControllers.getAllAcademicFaculties);

export const academicFacultyRoutes = router;
