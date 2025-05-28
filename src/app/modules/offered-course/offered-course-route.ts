import express from 'express';
import { offeredCourseControllers } from './offered-course-controller';
import validateRequest from '../../middleware/validateRequest';
import { OfferedCourseValidations } from './offered-course-validation';

const router = express.Router();

router.get('/', offeredCourseControllers.getAllOfferedCourses);

router.get('/:id', offeredCourseControllers.getAllOfferedCourses);

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  offeredCourseControllers.createOfferedCourse,
);

router.patch(
  '/:id',
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  offeredCourseControllers.updateOfferedCourse,
);

// router.delete(
//   '/:id',
//   offeredCourseControllers.deleteOfferedCourseFromDB,
// );

export const offeredCourseRoutes = router;
