import { Router } from 'express';
import { userRoutes } from '../modules/user/user-route';
import { studentsRoutes } from '../modules/students/student-route';
import { academicSemesterRoutes } from '../modules/academic-semister/academic-semester-route';
import { academicFacultyRoutes } from '../modules/academic-faculty/academic-faculty-route';
import { academicDepartmentRoutes } from '../modules/academic-department/academic-department-route';
import { FacultyRoutes } from '../modules/faculty/faculty-route';
import { AdminRoutes } from '../modules/admin/admin-route';
import { coursesRoute } from '../modules/course/course-route';
import { semesterRegistrationRoutes } from '../modules/semester-registration/semester-registration-route';

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
  {
    path: '/academic-department',
    route: academicDepartmentRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/courses',
    route: coursesRoute,
  },
  {
    path: '/semester-registrations',
    route: semesterRegistrationRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
