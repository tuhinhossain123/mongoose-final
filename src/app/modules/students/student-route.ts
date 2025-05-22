import express from 'express';
import { studentControllers } from './student-controller';

const router = express.Router();

router.post('/create-student', studentControllers.createStudent);
router.get('/', studentControllers.getAllStudents);
router.get('/:studentId', studentControllers.getSingleStudents);
router.delete('/:studentId', studentControllers.deleteStudents);

export const studentsRoutes = router;
