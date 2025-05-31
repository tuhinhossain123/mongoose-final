import express from 'express';
import { FacultyControllers } from './faculty-controller';
import validateRequest from '../../middleware/validateRequest';
import { updateFacultyValidationSchema } from './faculty-validation';
import auth from '../../middleware/auth';
import { USER_Role } from '../user/user-const';

const router = express.Router();

router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get(
  '/',
  auth(USER_Role.admin, USER_Role.faculty),
  FacultyControllers.getAllFaculties,
);

export const FacultyRoutes = router;
