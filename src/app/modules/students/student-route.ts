import express from 'express';
import { studentControllers } from './student-controller';

const router = express.Router();
router.get('/', studentControllers.getAllStudents);
router.get('/:studentId', studentControllers.getSingleStudents);
router.delete('/:studentId', studentControllers.deleteStudents);

export const studentsRoutes = router;
