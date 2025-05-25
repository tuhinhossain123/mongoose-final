import { model, Schema } from 'mongoose';
import { TAcademicDepartment } from './academic-department-interface';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
);

// ekoi name a jno department create na hoy tar jonno validation
academicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExist = await AcademicDepartment.findOne({
    name: this.name,
  });

  if (isDepartmentExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This department is already exist!',
    );
  }

  next();
});


// deleter kora id diye data update korle update hye jay eta na hoyar validation
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExist = await AcademicDepartment.findOne(query);

  if (!isDepartmentExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This department does not exist! ',
    );
  }

  next();
});



export const AcademicDepartment = model<TAcademicDepartment>(
  'academicDepartment',
  academicDepartmentSchema,
);
