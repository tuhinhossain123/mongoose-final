
import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { CourseValidations } from './course-validation';
import { courseControllers } from './course-controller';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(CourseValidations.createCourseValidationSchema),
  courseControllers.createCourse,
);

router.get('/:id', courseControllers.getAllCourses);

// router.patch(
//   '/:id',
//   validateRequest(CourseValidations.updateCourseValidationSchema),
//   courseControllers.,
// );

router.delete('/:id', courseControllers.deletedCourse);

// router.put(
//   '/:courseId/assign-faculties',
//   validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
//   CourseControllers.assignFacultiesWithCourse,
// );

router.delete(
  '/:courseId/remove-faculties',
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  courseControllers.deletedCourse,
);

router.get('/', courseControllers.getAllCourses);

export const coursesRoute = router;
