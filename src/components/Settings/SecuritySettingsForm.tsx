"use client";

import { FormEvent } from "react";
import { Shield, Key, Mail, Eye, EyeOff } from "lucide-react";

export interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  showCurrentPassword: boolean;
  showNewPassword: boolean;
  showConfirmPassword: boolean;
}

interface SecuritySettingsFormProps {
  userEmail: string;
  passwordForm: PasswordFormData;
  onPasswordFormChange: (data: PasswordFormData) => void;
  onSubmit: (e: FormEvent) => void;
  isSaving: boolean;
}

export default function SecuritySettingsForm({
  userEmail,
  passwordForm,
  onPasswordFormChange,
  onSubmit,
  isSaving,
}: SecuritySettingsFormProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Change Password - Left Column */}
      <div className="card border border-base-content/20">
        <div className="card-body">
          <h2 className="card-title text-title-lg mb-4">
            <Shield className="w-5 h-5" />
            Change Password
          </h2>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text">Current Password</span>
              </label>
              <div className="relative">
                <input
                  type={passwordForm.showCurrentPassword ? "text" : "password"}
                  placeholder="Enter your current password"
                  className="input input-bordered w-full pr-10"
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    onPasswordFormChange({
                      ...passwordForm,
                      currentPassword: e.target.value,
                    })
                  }
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400"
                  onClick={() =>
                    onPasswordFormChange({
                      ...passwordForm,
                      showCurrentPassword: !passwordForm.showCurrentPassword,
                    })
                  }
                >
                  {passwordForm.showCurrentPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text">New Password</span>
              </label>
              <div className="relative">
                <input
                  type={passwordForm.showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  className="input input-bordered w-full pr-10"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    onPasswordFormChange({
                      ...passwordForm,
                      newPassword: e.target.value,
                    })
                  }
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400"
                  onClick={() =>
                    onPasswordFormChange({
                      ...passwordForm,
                      showNewPassword: !passwordForm.showNewPassword,
                    })
                  }
                >
                  {passwordForm.showNewPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text">Confirm New Password</span>
              </label>
              <div className="relative">
                <input
                  type={passwordForm.showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  className="input input-bordered w-full pr-10"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    onPasswordFormChange({
                      ...passwordForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400"
                  onClick={() =>
                    onPasswordFormChange({
                      ...passwordForm,
                      showConfirmPassword: !passwordForm.showConfirmPassword,
                    })
                  }
                >
                  {passwordForm.showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="divider"></div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="submit"
                className="btn btn-secondary"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Changing...
                  </>
                ) : (
                  <>
                    <Key className="w-4 h-4" />
                    Change Password
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Email Verification - Right Column */}
      <div className="card border border-base-300">
        <div className="card-body">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-6 h-6 text-primary" />
            <h2 className="card-title text-title-lg">Email Verification</h2>
          </div>

          <div className="space-y-4">
            <p className="text-body-md text-base-content/70">
              Keep your account secure by ensuring your email is verified
            </p>

            <div className="flex items-center justify-between p-4 border border-base-300 rounded-lg">
              <div className="flex items-center gap-3">
                {/* FIXME Check email validation here */}
                <div
                  className={`w-3 h-3 rounded-full ${
                    true ? "bg-success" : "bg-warning"
                  }`}
                ></div>
                <div>
                  <div className="font-medium">{userEmail}</div>
                  <div className="text-sm text-base-content/70">
                    {/* FIXME Check email validation here */}
                    {true ? "Email is verified" : "Email needs verification"}
                  </div>
                </div>
              </div>
              {/* FIXME Check email validation here */}
              {!true && (
                <button className="btn btn-outline btn-sm">
                  Send Verification Email
                </button>
              )}
            </div>

            {/* Additional security info */}
            <div className="mt-6 p-4 bg-base-200 rounded-lg">
              <h3 className="font-semibold mb-2">Security Tips</h3>
              <ul className="text-sm text-base-content/70 space-y-1">
                <li>• Use a strong, unique password</li>
                <li>• Don&apos;t share your password with anyone</li>
                <li>• Change your password regularly</li>
                <li>• Keep your email address verified</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
