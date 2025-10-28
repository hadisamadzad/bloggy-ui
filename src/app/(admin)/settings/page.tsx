"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getLocalUserId, getUserProfile } from "@/services/auth-api";
import { getBlogSettings, updateBlogSettings } from "@/services/setting-api";
import { ApiBlogSetting } from "@/types/setting";
import ToastBar from "@/components/Common/ToastBar";
import type { ToastMessage } from "@/components/Common/ToastBar";
import {
  BlogSettingsForm,
  AccountSettingsForm,
  SecuritySettingsForm,
  SettingsTabNavigation,
  SettingsHeader,
  ErrorAlert,
} from "@/components/Settings";
import type {
  BlogFormData,
  UserProfile,
  UserFormData,
  PasswordFormData,
  SettingsTab,
} from "@/components/Settings";
import { updateUser, updateUserPassword } from "@/services/user-api";

export default function SettingsPage() {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<ToastMessage | null>(null);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<SettingsTab>("blog");
  const [blogSettings, setBlogSettings] = useState<ApiBlogSetting | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  // Form states
  const [blogFormData, setBlogFormData] = useState<BlogFormData>({
    authorName: "",
    authorTitle: "",
    aboutAuthor: "",
    blogTitle: "",
    blogSubtitle: "",
    blogDescription: "",
    pageTitleTemplate: "",
    blogUrl: "",
    seoMetaTitle: "",
    seoMetaDescription: "",
    blogLogoUrl: "",
    socials: [],
    copyrightText: "",
  });

  const [userFormData, setUserFormData] = useState<UserFormData>({
    firstName: "",
    lastName: "",
  });

  const [passwordForm, setPasswordForm] = useState<PasswordFormData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    showCurrentPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      // Load user profile from API
      const userProfileData = await getUserProfile();
      if (userProfileData) {
        // Add additional UI fields that might not come from API
        const userProfile: UserProfile = {
          ...userProfileData,
        };

        setUserProfile(userProfile);
        setUserFormData({
          firstName: userProfile.firstName,
          lastName: userProfile.lastName,
        });
      } else {
        setError("Failed to load user profile");
      }

      // Load blog settings from API
      const blogSettingsData = await getBlogSettings();
      if (blogSettingsData) {
        setBlogSettings(blogSettingsData);
        setBlogFormData({
          authorName: blogSettingsData.authorName,
          authorTitle: blogSettingsData.authorTitle,
          aboutAuthor: blogSettingsData.aboutAuthor,
          blogTitle: blogSettingsData.blogTitle,
          blogSubtitle: blogSettingsData.blogSubtitle,
          blogDescription: blogSettingsData.blogDescription,
          blogUrl: blogSettingsData.blogUrl,
          pageTitleTemplate: blogSettingsData.pageTitleTemplate,
          seoMetaTitle: blogSettingsData.seoMetaTitle,
          seoMetaDescription: blogSettingsData.seoMetaDescription,
          blogLogoUrl: blogSettingsData.blogLogoUrl,
          socials: [...blogSettingsData.socials],
          copyrightText: blogSettingsData.copyrightText,
        });
      } else {
        // Fallback to default settings if API fails
        const defaultSettings: ApiBlogSetting = {
          authorName: "",
          authorTitle: "",
          aboutAuthor: "",
          blogTitle: "",
          blogSubtitle: "",
          blogDescription: "",
          blogUrl: "",
          pageTitleTemplate: "",
          seoMetaTitle: "",
          seoMetaDescription: "",
          blogLogoUrl: "",
          socials: [],
          copyrightText: "",
          updatedAt: new Date().toISOString(),
        };
        setBlogSettings(defaultSettings);
        setBlogFormData({
          authorName: "",
          authorTitle: "",
          aboutAuthor: "",
          blogTitle: "",
          blogSubtitle: "",
          blogDescription: "",
          blogUrl: "",
          pageTitleTemplate: "",
          seoMetaTitle: "",
          seoMetaDescription: "",
          blogLogoUrl: "",
          socials: [],
          copyrightText: "",
        });
      }
    } catch (err) {
      setError("Failed to load settings");
      console.error("Load settings error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handlers
  const handleBlogSettingSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      // Call API to update blog settings
      const success = await updateBlogSettings(blogFormData);

      if (success) {
        setBlogSettings({
          ...blogFormData,
          updatedAt: new Date().toISOString(),
        });

        // Refresh the router to update server components (like HeaderBrand)
        router.refresh();
        setTimeout(() => {
          setIsSaving(false);
        }, 1000);
        setToastMessage({
          type: "success",
          text: "Blog settings updated successfully!",
        });
        setToastOpen(true);
      } else {
        throw new Error("Failed to update settings");
      }
    } catch (err) {
      setError("Failed to update blog settings. Please try again.");
      console.error("Update error:", err);
      setIsSaving(false);
    }
  };

  const handleUserProfileSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      // Get userId from localStorage for better performance
      const userId = getLocalUserId();
      if (!userId) {
        throw new Error("User ID not available");
      }
      const success = await updateUser(userId, {
        firstName: userFormData.firstName,
        lastName: userFormData.lastName,
      });
      if (success) {
        if (userProfile) {
          setUserProfile({
            ...userProfile,
            firstName: userFormData.firstName,
            lastName: userFormData.lastName,
          });
        }
        setToastMessage({
          type: "success",
          text: "Profile updated successfully!",
        });
        setToastOpen(true);
        setTimeout(() => {
          setIsSaving(false);
        }, 1000);
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (err) {
      setError("Failed to update profile. Please try again.");
      console.error("Update error:", err);
      setIsSaving(false);
    }
  };

  const handlePasswordChangeSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setIsSaving(true);

    try {
      // Get userId from localStorage for better performance
      const userId = getLocalUserId();
      if (!userId) {
        throw new Error("User ID not available");
      }
      const success = await updateUserPassword(
        userId,
        passwordForm.currentPassword,
        passwordForm.newPassword
      );
      if (success) {
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
          showCurrentPassword: false,
          showNewPassword: false,
          showConfirmPassword: false,
        });
        setToastMessage({
          type: "success",
          text: "Password updated successfully!",
        });
        setToastOpen(true);
        setTimeout(() => {
          setIsSaving(false);
        }, 1000);
      } else {
        throw new Error("Password update failed");
      }
    } catch (err) {
      setError(
        "Failed to change password. Please check your current password."
      );
      console.error("Password change error:", err);
      setIsSaving(false);
    }
  };

  const handleUserReset = () => {
    if (userProfile) {
      setUserFormData({
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
      });
      setError("");
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {toastMessage && (
        <ToastBar
          open={toastOpen}
          message={toastMessage}
          onClose={() => setToastOpen(false)}
        />
      )}
      <div className="max-w-6xl mx-auto">
        <SettingsHeader />

        <ErrorAlert error={error} onDismiss={() => setError("")} />

        <SettingsTabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Blog Settings Tab */}
        {activeTab === "blog" && blogSettings && (
          <>
            <BlogSettingsForm
              formData={blogFormData}
              onFormDataChange={setBlogFormData}
              onSubmit={handleBlogSettingSubmit}
              isSaving={isSaving}
            />
            <div className="flex items-center justify-end gap-3 mt-2">
              <span className="inline-block text-sm text-warning bg-warning/10 px-3 py-2 rounded">
                Note: Changes may take a few minutes to be applied due to
                caching.
              </span>
            </div>
          </>
        )}

        {/* Account Tab */}
        {activeTab === "account" && userProfile && (
          <>
            <AccountSettingsForm
              userProfile={userProfile}
              formData={userFormData}
              onFormDataChange={setUserFormData}
              onSubmit={handleUserProfileSubmit}
              onReset={handleUserReset}
              isSaving={isSaving}
            />
            <div className="flex items-center justify-end gap-3 mt-2">
              <span className="inline-block text-sm text-warning bg-warning/10 px-3 py-2 rounded">
                Note: Changes may take a few minutes to be applied due to
                caching and propagation.
              </span>
            </div>
          </>
        )}

        {/* Security Tab */}
        {activeTab === "security" && userProfile && (
          <SecuritySettingsForm
            userEmail={userProfile.email}
            passwordForm={passwordForm}
            onPasswordFormChange={setPasswordForm}
            onSubmit={handlePasswordChangeSubmit}
            isSaving={isSaving}
          />
        )}
      </div>
    </div>
  );
}
