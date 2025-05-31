import { Model } from 'mongoose';
import { USER_Role } from './user-const';

export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  paswordChangeAt?: Date;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExistByCustomId(id: string): Promise<TUser>;
  isUserPasswordmatched(
    plainTextPassword: string,
    hashPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_Role;
