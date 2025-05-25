import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './academic-semister-interface';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academic-semister-const';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSemesterName,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: Months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Months,
    },
  },
  {
    timestamps: true,
  },
);

// ekoi bochor a ekoi name a 2 ta name a jno smester create na hoy tar validation check here
academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemesterExists) {
    throw new AppError( httpStatus.NOT_FOUND,'semester is already exists !!');
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
