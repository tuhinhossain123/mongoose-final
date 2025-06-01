import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AuthValidation } from './auth-validation';
import { authControllers } from './auth-controller';
import { USER_Role } from '../user/user-const';
import auth from '../../middleware/auth';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.logingValidatonSchema),
  authControllers.loginUser,
);

router.post(
  '/change-password',
  auth(USER_Role.admin, USER_Role.faculty, USER_Role.student),
  validateRequest(AuthValidation.changePasswordValidatonSchema),
  authControllers.changePassword,
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  authControllers.refreshToken,
);

export const AuthRoutes = router;
