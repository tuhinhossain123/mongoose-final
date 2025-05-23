import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { studentsRoutes } from './app/modules/students/student-route';
import { userRoutes } from './app/modules/user/user-route';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// applications routes
app.use('/api/v1/students', studentsRoutes);
app.use('/api/v1/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
});
export default app;
