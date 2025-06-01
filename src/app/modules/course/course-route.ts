import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { CourseValidations } from './course-validation';
import { courseControllers } from './course-controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.post(
  auth('admin'),
  '/create-course',
  validateRequest(CourseValidations.createCourseValidationSchema),
  courseControllers.createCourse,
);

router.get('/:id', courseControllers.getAllCourses);

router.patch(
  '/:id',
  auth('admin'),
  validateRequest(CourseValidations.updateCourseValidationSchema),
  courseControllers.updateCourse,
);

router.delete('/:id', auth('admin'), courseControllers.deletedCourse);

router.put(
  '/:courseId/assign-faculties',
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  courseControllers.assignFacultiesWithCourse,
);

router.delete(
  '/:courseId/remove-faculties',
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  courseControllers.removeFacultiesFromCourse,
);

router.get(
  '/',
  auth('student', 'faculty', 'admin'),
  courseControllers.getAllCourses,
);

export const coursesRoute = router;
