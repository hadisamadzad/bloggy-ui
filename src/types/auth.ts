export interface UserInfo {
  email: string;
  fullName: string;
  userId: string | null;
  role: UserRole | null;
}

export interface UserProfile {
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

export enum UserRole {
  Owner = "Owner",
  Admin = "Admin",
  User = "User",
}