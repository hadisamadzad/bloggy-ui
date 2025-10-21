import { UserRole } from "./auth";

export interface LoginApiResponse {
  email: string;
  fullName: string;
  accessToken: string;
}

export interface UpdateUserProfileApiRequest {
  firstName: string;
  lastName: string;
}

export interface GetUserProfileApiResponse {
  userId: string;
  email: string;
  isEmailConfirmed: boolean;
  firstName: string;
  lastName: string;
  fullName: string;
  role: UserRole;
  status: string;
  lastLoginDate: string;
  createdAt: string;
  updatedAt: string;
}