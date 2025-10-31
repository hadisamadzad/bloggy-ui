"use client";

import { FormEvent } from "react";
import { User, Mail, Calendar, Save } from "lucide-react";
import { formatDate } from "@/lib/date-tools";

export interface UserProfile {
  userId: string;
  email: string;
  isEmailConfirmed: boolean;
  firstName: string;
  lastName: string;
  fullName: string;
  role: string;
  status: string;
  lastLoginDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserFormData {
  firstName: string;
  lastName: string;
}

interface AccountSettingsFormProps {
  userProfile: UserProfile;
  formData: UserFormData;
  onFormDataChange: (data: UserFormData) => void;
  onSubmit: (e: FormEvent) => void;
  onReset: () => void;
  isSaving: boolean;
}

export default function AccountSettingsForm({
  userProfile,
  formData,
  onFormDataChange,
  onSubmit,
  onReset,
  isSaving,
}: AccountSettingsFormProps) {
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Owner":
        return "badge-primary";
      case "Admin":
        return "badge-secondary";
      case "Editor":
        return "badge-accent";
      default:
        return "badge-neutral";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Active":
        return "badge-success";
      case "Inactive":
        return "badge-warning";
      case "Suspended":
        return "badge-error";
      default:
        return "badge-neutral";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Profile Overview */}
      <div className="lg:col-span-1">
        <div className="card border border-base-300">
          <div className="card-body">
            <h2 className="card-title text-title-lg">Profile Overview</h2>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary text-primary-content rounded-full flex items-center justify-center">
                  <span className="text-lg font-medium">
                    {userProfile.firstName[0]}
                    {userProfile.lastName[0]}
                  </span>
                </div>
                <div>
                  <div className="font-semibold">
                    {userProfile.firstName} {userProfile.lastName}
                  </div>
                  <div className="text-sm text-base-content/70">
                    {userProfile.email}
                  </div>
                </div>
              </div>

              <div className="divider"></div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-base-content/70">Role</span>
                  <span
                    className={`badge ${getRoleBadgeColor(userProfile.role)}`}
                  >
                    {userProfile.role}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-base-content/70">Status</span>
                  <span
                    className={`badge ${getStatusBadgeColor(
                      userProfile.status
                    )}`}
                  >
                    {userProfile.status}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-base-content/70">
                    Email Verified
                  </span>
                  <span
                    className={`badge ${
                      userProfile.isEmailConfirmed
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {userProfile.isEmailConfirmed ? "Verified" : "Unverified"}
                  </span>
                </div>
              </div>

              <div className="divider"></div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-base-content/70">
                  <Calendar className="w-4 h-4" />
                  <span>Owned {formatDate(userProfile.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2 text-base-content/70">
                  <User className="w-4 h-4" />
                  <span>
                    Last login {formatDate(userProfile.lastLoginDate)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Form */}
      <div className="lg:col-span-2">
        <div className="card border border-base-300">
          <div className="card-body">
            <h2 className="card-title text-title-lg">Edit Profile</h2>
            <p className="text-body-md text-base-content/70 mb-4">
              Update your personal information
            </p>

            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label pb-1">
                    <span className="text-label-lg">First Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    className="input input-bordered w-full"
                    value={formData.firstName}
                    onChange={(e) =>
                      onFormDataChange({
                        ...formData,
                        firstName: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label pb-1">
                    <span className="text-label-lg">Last Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    className="input input-bordered w-full"
                    value={formData.lastName}
                    onChange={(e) =>
                      onFormDataChange({
                        ...formData,
                        lastName: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label pb-1">
                  <span className="text-label-lg">Email Address</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    className="input input-bordered w-full"
                    value={userProfile.email}
                    disabled
                  />
                  <Mail className="absolute right-3 top-3 w-5 h-5 text-base-content/40" />
                </div>
                <label className="label">
                  <span className="text-label-lg-alt text-base-content/60">
                    Email address cannot be changed. Contact support if needed.
                  </span>
                </label>
              </div>

              <div className="divider"></div>

              <div className="flex items-center justify-end gap-3">
                {/* Success tick removed; ToastBar is used for feedback */}
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={onReset}
                >
                  Reset
                </button>

                <button
                  type="submit"
                  className="btn btn-secondary"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
