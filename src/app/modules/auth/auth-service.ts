import config from '../../config';
import AppError from '../../errors/appError';
import { User } from '../user/user-model';
import { TLoginUser } from './auth-interface';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistByCustomId(payload.id);

  // checking if the user is exist
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!!');
  }
  // checking if the user is already deleted
//   const isDeleted = user?.isDeleted;
//   if (!isDeleted) {
//     throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted!!');
//   }

  // checking if the user is blocked
  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
  }

  //   checking if the user is correct
  if (!(await User.isUserPasswordmatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
  }

  // create token and sent to the client

  const jwtPayload = {
    userId: user,
    role: user?.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  return {
    accessToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

export const authServices = {
  loginUser,
};
