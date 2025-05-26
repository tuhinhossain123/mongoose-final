import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { academicDepartmentControllers } from './academic-department-controller';
import { AcademicDepartmentValidation } from './academic-department-validation';

const router = express.Router();
router.post(
  '/create-academic-department',
  // validateRequest(
  //   AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  // ),
  academicDepartmentControllers.createAcademicDepartment,
);
router.get(
  '/:departmentId',
  academicDepartmentControllers.getSingleAcademicDepartment,
);

router.patch(
  '/:departmentId',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  academicDepartmentControllers.updateAcademicDepartment,
);

router.get('/', academicDepartmentControllers.getAllAcademicDepartments);

export const academicDepartmentRoutes = router;
