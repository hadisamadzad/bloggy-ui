"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getLocalUserId, getUserProfile } from "@/services/auth-api";
import { getBlogSettings, updateBlogSettings } from "@/services/setting-api";
import { SocialLink } from "@/types/setting";
import {
  BlogSettingsForm,
  AccountSettingsForm,
  SecuritySettingsForm,
  SettingsTabNavigation,
  SettingsHeader,
  ErrorAlert,
  type BlogFormData,
  type UserProfile,
  type UserFormData,
  type PasswordFormData,
  type SettingsTab,
} from "@/components/Settings";
import { updateUser, updateUserPassword } from "@/services/user-api";

interface BlogSettings {
  blogTitle: string;
  blogSubtitle: string;
  blogDescription: string;
  blogPageTitle: string;
  seoMetaTitle: string;
  seoMetaDescription: string;
  blogUrl: string;
  blogLogoUrl: string;
  socials: SocialLink[];
  updatedAt: string;
}

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<SettingsTab>("blog");
  const [blogSettings, setBlogSettings] = useState<BlogSettings | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessTick, setShowSuccessTick] = useState(false);

  // Form states
  const [blogFormData, setBlogFormData] = useState<BlogFormData>({
    blogTitle: "",
    blogSubtitle: "",
    blogDescription: "",
    blogPageTitle: "",
    seoMetaTitle: "",
    seoMetaDescription: "",
    blogUrl: "",
    blogLogoUrl: "",
    socials: [],
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
          blogTitle: blogSettingsData.blogTitle,
          blogSubtitle: blogSettingsData.blogSubtitle,
          blogDescription: blogSettingsData.blogDescription,
          blogPageTitle: blogSettingsData.blogPageTitle,
          seoMetaTitle: blogSettingsData.seoMetaTitle,
          seoMetaDescription: blogSettingsData.seoMetaDescription,
          blogUrl: blogSettingsData.blogUrl,
          blogLogoUrl: blogSettingsData.blogLogoUrl,
          socials: [...blogSettingsData.socials],
        });
      } else {
        // Fallback to default settings if API fails
        const defaultSettings: BlogSettings = {
          blogTitle: "",
          blogSubtitle: "",
          blogDescription: "",
          blogPageTitle: "",
          seoMetaTitle: "",
          seoMetaDescription: "",
          blogUrl: "",
          blogLogoUrl: "",
          socials: [],
          updatedAt: new Date().toISOString(),
        };
        setBlogSettings(defaultSettings);
        setBlogFormData({
          blogTitle: "",
          blogSubtitle: "",
          blogDescription: "",
          blogPageTitle: "",
          seoMetaTitle: "",
          seoMetaDescription: "",
          blogUrl: "",
          blogLogoUrl: "",
          socials: [],
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
  const handleBlogSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      // Call API to update blog settings
      const success = await updateBlogSettings(blogFormData);

      if (success) {
        // Update local state with the form data and new timestamp
        setBlogSettings({
          ...blogFormData,
          updatedAt: new Date().toISOString(),
        });

        // Refresh the router to update server components (like HeaderBrand)
        router.refresh();

        setShowSuccessTick(true);

        // Hide success tick after 3 seconds
        setTimeout(() => {
          setShowSuccessTick(false);
        }, 3000);
      } else {
        throw new Error("Failed to update settings");
      }
    } catch (err) {
      setError("Failed to update blog settings. Please try again.");
      console.error("Update error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUserSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      // Get userId from localStorage for better performance
      const userId = getLocalUserId();
      if (!userId) {
        throw new Error("User ID not available");
      }

      // Call API to update user profile
      const success = await updateUser(userId, {
        firstName: userFormData.firstName,
        lastName: userFormData.lastName,
      });

      if (success) {
        // Update local state with the form data
        if (userProfile) {
          setUserProfile({
            ...userProfile,
            firstName: userFormData.firstName,
            lastName: userFormData.lastName,
          });
        }

        setShowSuccessTick(true);

        // Hide success tick after 3 seconds
        setTimeout(() => {
          setShowSuccessTick(false);
        }, 3000);
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (err) {
      setError("Failed to update profile. Please try again.");
      console.error("Update error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordSubmit = async (e: FormEvent) => {
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

      // Call API to change password
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

        setShowSuccessTick(true);

        // Hide success tick after 3 seconds
        setTimeout(() => {
          setShowSuccessTick(false);
        }, 3000);
      } else {
        throw new Error("Password update failed");
      }
    } catch (err) {
      setError(
        "Failed to change password. Please check your current password."
      );
      console.error("Password change error:", err);
    } finally {
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
      <div className="max-w-6xl mx-auto">
        <SettingsHeader />

        <ErrorAlert error={error} onDismiss={() => setError("")} />

        <SettingsTabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Blog Settings Tab */}
        {activeTab === "blog" && blogSettings && (
          <BlogSettingsForm
            formData={blogFormData}
            onFormDataChange={setBlogFormData}
            onSubmit={handleBlogSubmit}
            isSaving={isSaving}
            showSuccessTick={showSuccessTick}
          />
        )}

        {/* Account Tab */}
        {activeTab === "account" && userProfile && (
          <AccountSettingsForm
            userProfile={userProfile}
            formData={userFormData}
            onFormDataChange={setUserFormData}
            onSubmit={handleUserSubmit}
            onReset={handleUserReset}
            isSaving={isSaving}
            showSuccessTick={showSuccessTick}
          />
        )}

        {/* Security Tab */}
        {activeTab === "security" && userProfile && (
          <SecuritySettingsForm
            userEmail={userProfile.email}
            passwordForm={passwordForm}
            onPasswordFormChange={setPasswordForm}
            onSubmit={handlePasswordSubmit}
            isSaving={isSaving}
            showSuccessTick={showSuccessTick}
          />
        )}
      </div>
    </div>
  );
}
