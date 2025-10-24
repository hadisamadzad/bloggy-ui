import { UpdateUserProfileApiRequest as UpdateUserApiRequest } from "@/types/auth-api";
import { IDENTITY_API_URL } from "@/config/api";
import { authenticatedRequest } from "./auth-api";

const baseUrl: string = IDENTITY_API_URL;

// Update user profile
export async function updateUser(
  userId: string,
  profileData: UpdateUserApiRequest
): Promise<boolean> {
  try {
    const res = await authenticatedRequest(`${baseUrl}/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });

    if (!res.ok) {
      throw new Error(`Failed to update user profile`);
    }

    return true;
  } catch (error) {
    console.error('Update user profile error:', error);
    return false;
  }
}

// Update user password
export async function updateUserPassword(
  userId: string,
  currentPassword: string,
  newPassword: string
): Promise<boolean> {
  try {
    const res = await authenticatedRequest(`${baseUrl}/users/${userId}/password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentPassword,
        newPassword
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to update password`);
    }

    return true;
  } catch (error) {
    console.error('Update password error:', error);
    return false;
  }
}