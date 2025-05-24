import { Router } from 'express';
import { userRoutes } from '../modules/user/user-route';
import { studentsRoutes } from '../modules/students/student-route';
import { academicSemesterRoutes } from '../modules/academic-semister/academic-semester-route';
import { academicFacultyRoutes } from '../modules/academic-faculty/academic-faculty-route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/students',
    route: studentsRoutes,
  },
  {
    path: '/academic-semesters',
    route: academicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: academicFacultyRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
