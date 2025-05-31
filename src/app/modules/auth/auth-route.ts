import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AuthValidation } from './auth-validation';
import { authControllers } from './auth-controller';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.logingValidatonSchema),
  authControllers.loginUser,
);

// router.post(
//   '/change-password',
//   auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
//   validateRequest(AuthValidation.changePasswordValidationSchema),
//   AuthControllers.changePassword,
// );

// router.post(
//   '/refresh-token',
//   validateRequest(AuthValidation.refreshTokenValidationSchema),
//   AuthControllers.refreshToken,
// );

export const AuthRoutes = router;
