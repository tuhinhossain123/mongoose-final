import { model, Schema } from 'mongoose';
import { TAcademicDepartment } from './academic-department-interface';

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
  const isDepartmentExists = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isDepartmentExists) {
    throw new Error('This department is allready exists!!');
  }
  next();
});

// deleter kora id diye data update korle update hye jay eta na hoyar validation
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExists = await AcademicDepartment.findOne(query);
  if (!isDepartmentExists) {
    throw new Error('This department does not exists!!');
  }
  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'academicDepartment',
  academicDepartmentSchema,
);
