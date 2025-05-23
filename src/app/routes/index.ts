import { Router } from 'express';
import { userRoutes } from '../modules/user/user-route';
import { studentsRoutes } from '../modules/students/student-route';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
