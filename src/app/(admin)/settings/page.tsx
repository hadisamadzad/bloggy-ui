"use client";

import { useState, useEffect, FormEvent } from "react";
import {
  updateUser,
  getUserProfile,
  getLocalUserId,
  updateUserPassword,
} from "@/services/identity-api";
import { getBlogSettings, updateBlogSettings } from "@/services/setting-api";
import { SocialNetworkName } from "@/types/setting";
import {
  User,
  Mail,
  Shield,
  Calendar,
  Key,
  Save,
  AlertCircle,
  Globe,
  Image as ImageIcon,
  Link as LinkIcon,
  Plus,
  Trash2,
  Move,
  Eye,
  EyeOff,
  CheckCircle,
  X,
} from "lucide-react";

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

interface SocialLink {
  order: number;
  name: SocialNetworkName;
  url: string;
}

interface UserProfile {
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

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"blog" | "account" | "security">(
    "blog"
  );
  const [blogSettings, setBlogSettings] = useState<BlogSettings | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessTick, setShowSuccessTick] = useState(false);

  // Form states
  const [blogFormData, setBlogFormData] = useState<
    Omit<BlogSettings, "updatedAt">
  >({
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

  const [userFormData, setUserFormData] = useState({
    firstName: "",
    lastName: "",
  });

  const [passwordForm, setPasswordForm] = useState({
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

  const addSocialLink = () => {
    const newOrder =
      Math.max(...blogFormData.socials.map((s) => s.order), 0) + 1;
    setBlogFormData({
      ...blogFormData,
      socials: [
        ...blogFormData.socials,
        { order: newOrder, name: SocialNetworkName.Twitter, url: "" },
      ],
    });
  };

  const removeSocialLink = (index: number) => {
    setBlogFormData({
      ...blogFormData,
      socials: blogFormData.socials.filter((_, i) => i !== index),
    });
  };

  const updateSocialLink = (
    index: number,
    field: "name" | "url",
    value: string | SocialNetworkName
  ) => {
    const updatedSocials = [...blogFormData.socials];
    if (field === "name") {
      updatedSocials[index][field] = value as SocialNetworkName;
    } else {
      updatedSocials[index][field] = value as string;
    }
    setBlogFormData({
      ...blogFormData,
      socials: updatedSocials,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-headline-lg">Settings</h1>
          </div>
          <p className="text-body-md text-base-content/70">
            Manage blog configuration and account settings
          </p>
        </div>

        {/* Error Messages */}
        {error && (
          <div className="alert alert-error mb-6">
            <AlertCircle className="w-6 h-6" />
            <span className="flex-1">{error}</span>
            <button
              onClick={() => setError("")}
              className="btn btn-ghost btn-sm btn-square"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="tabs tabs-boxed mb-6">
          <button
            className={`tab ${activeTab === "blog" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("blog")}
          >
            <Globe className="w-4 h-4 mr-2" />
            Blog Settings
          </button>
          <button
            className={`tab ${activeTab === "account" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("account")}
          >
            <User className="w-4 h-4 mr-2" />
            Account
          </button>
          <button
            className={`tab ${activeTab === "security" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("security")}
          >
            <Shield className="w-4 h-4 mr-2" />
            Security
          </button>
        </div>

        {/* Blog Settings Tab */}
        {activeTab === "blog" && blogSettings && (
          <div className="space-y-6">
            <form onSubmit={handleBlogSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="card border border-base-content/20">
                  <div className="card-body">
                    <h2 className="card-title text-title-lg mb-4">
                      Basic Information
                    </h2>

                    <div className="space-y-4">
                      <div className="form-control">
                        <label className="label pb-1">
                          <span className="label-text font-medium">
                            Blog Title
                          </span>
                        </label>

                        <input
                          type="text"
                          placeholder="Your blog title"
                          className="input input-bordered w-full"
                          value={blogFormData.blogTitle}
                          onChange={(e) =>
                            setBlogFormData({
                              ...blogFormData,
                              blogTitle: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      <div className="form-control">
                        <label className="label pb-1">
                          <span className="label-text font-medium">
                            Blog Subtitle
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Your role or tagline"
                          className="input input-bordered w-full"
                          value={blogFormData.blogSubtitle}
                          onChange={(e) =>
                            setBlogFormData({
                              ...blogFormData,
                              blogSubtitle: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="form-control">
                        <label className="label pb-1">
                          <span className="label-text font-medium">
                            Blog Description
                          </span>
                        </label>
                        <textarea
                          placeholder="Brief description of your blog"
                          className="textarea textarea-bordered h-24 w-full"
                          value={blogFormData.blogDescription}
                          onChange={(e) =>
                            setBlogFormData({
                              ...blogFormData,
                              blogDescription: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="form-control">
                        <label className="label pb-1">
                          <span className="label-text font-medium">
                            Page Title
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Browser tab title"
                          className="input input-bordered w-full"
                          value={blogFormData.blogPageTitle}
                          onChange={(e) =>
                            setBlogFormData({
                              ...blogFormData,
                              blogPageTitle: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* SEO & Technical */}
                <div className="card border border-base-content/20">
                  <div className="card-body">
                    <h2 className="card-title text-title-lg mb-4">
                      SEO & Technical
                    </h2>

                    <div className="space-y-4">
                      <div className="form-control">
                        <label className="label pb-1">
                          <span className="label-text font-medium">
                            Blog URL
                          </span>
                        </label>
                        <div className="relative">
                          <input
                            type="url"
                            placeholder="blog.yourdomain.com"
                            className="input input-bordered w-full"
                            value={blogFormData.blogUrl}
                            onChange={(e) =>
                              setBlogFormData({
                                ...blogFormData,
                                blogUrl: e.target.value,
                              })
                            }
                          />
                          <Globe className="absolute right-3 top-3 w-5 h-5 text-base-content/40" />
                        </div>
                      </div>

                      <div className="form-control">
                        <label className="label pb-1">
                          <span className="label-text font-medium">
                            Logo URL
                          </span>
                        </label>
                        <div className="relative">
                          <input
                            type="url"
                            placeholder="https://example.com/logo.png"
                            className="input input-bordered w-full"
                            value={blogFormData.blogLogoUrl}
                            onChange={(e) =>
                              setBlogFormData({
                                ...blogFormData,
                                blogLogoUrl: e.target.value,
                              })
                            }
                          />
                          <ImageIcon className="absolute right-3 top-3 w-5 h-5 text-base-content/40" />
                        </div>
                      </div>

                      <div className="form-control">
                        <label className="label pb-1">
                          <span className="label-text font-medium">
                            SEO Meta Title
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="SEO optimized title"
                          className="input input-bordered w-full"
                          value={blogFormData.seoMetaTitle}
                          onChange={(e) =>
                            setBlogFormData({
                              ...blogFormData,
                              seoMetaTitle: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="form-control">
                        <label className="label pb-1">
                          <span className="label-text font-medium">
                            SEO Meta Description
                          </span>
                        </label>
                        <textarea
                          placeholder="SEO meta description (155 characters max)"
                          className="textarea textarea-bordered h-24 rounded-lg w-full"
                          maxLength={155}
                          value={blogFormData.seoMetaDescription}
                          onChange={(e) =>
                            setBlogFormData({
                              ...blogFormData,
                              seoMetaDescription: e.target.value,
                            })
                          }
                        />
                        <label className="label">
                          <span className="label-text-alt">
                            {blogFormData.seoMetaDescription.length}/155
                            characters
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="card border border-base-content/20 mt-6">
                <div className="card-body">
                  <div className="flex items-center justify-between ">
                    <h2 className="card-title text-title-lg mb-4">
                      Social Links
                    </h2>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={addSocialLink}
                    >
                      <Plus className="w-4 h-4" />
                      Add Link
                    </button>
                  </div>

                  <div className="space-y-3">
                    {blogFormData.socials.map((social, index) => (
                      <div key={index} className="flex gap-3 items-center">
                        <div className="flex items-center gap-2 text-base-content/50">
                          <Move className="w-4 h-4" />
                          <span className="text-sm">#{social.order}</span>
                        </div>
                        <select
                          className="select select-bordered flex-1"
                          value={social.name}
                          onChange={(e) =>
                            updateSocialLink(
                              index,
                              "name",
                              e.target.value as SocialNetworkName
                            )
                          }
                        >
                          {Object.values(SocialNetworkName).map(
                            (networkName) => (
                              <option key={networkName} value={networkName}>
                                {networkName}
                              </option>
                            )
                          )}
                        </select>
                        <input
                          type="url"
                          placeholder="https://example.com/profile"
                          className="input input-bordered flex-1"
                          value={social.url}
                          onChange={(e) =>
                            updateSocialLink(index, "url", e.target.value)
                          }
                        />
                        <button
                          type="button"
                          className="btn btn-outline btn-error"
                          onClick={() => removeSocialLink(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}

                    {blogFormData.socials.length === 0 && (
                      <div className="text-center py-8 text-base-content/50">
                        <LinkIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>No social links added yet</p>
                        <p className="text-sm">
                          Click &ldquo;Add Link&rdquo; to get started
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex items-center justify-end gap-3 mt-6">
                {showSuccessTick && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <span className="text-sm font-bold text-green-600">
                      Saved!
                    </span>
                  </div>
                )}
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
                      Save Blog Settings
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Account Tab */}
        {activeTab === "account" && userProfile && (
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
                        <span className="text-sm text-base-content/70">
                          Role
                        </span>
                        <span
                          className={`badge ${getRoleBadgeColor(
                            userProfile.role
                          )}`}
                        >
                          {userProfile.role}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-base-content/70">
                          Status
                        </span>
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
                          {userProfile.isEmailConfirmed
                            ? "Verified"
                            : "Unverified"}
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

                  <form onSubmit={handleUserSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="form-control">
                        <label className="label pb-1">
                          <span className="label-text">First Name</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your first name"
                          className="input input-bordered w-full"
                          value={userFormData.firstName}
                          onChange={(e) =>
                            setUserFormData({
                              ...userFormData,
                              firstName: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      <div className="form-control">
                        <label className="label pb-1">
                          <span className="label-text">Last Name</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your last name"
                          className="input input-bordered w-full"
                          value={userFormData.lastName}
                          onChange={(e) =>
                            setUserFormData({
                              ...userFormData,
                              lastName: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="form-control">
                      <label className="label pb-1">
                        <span className="label-text">Email Address</span>
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
                        <span className="label-text-alt text-base-content/60">
                          Email address cannot be changed. Contact support if
                          needed.
                        </span>
                      </label>
                    </div>

                    <div className="divider"></div>

                    <div className="flex items-center justify-end gap-3">
                      {showSuccessTick && (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                          <span className="text-sm font-bold text-green-600">
                            Saved!
                          </span>
                        </div>
                      )}
                      <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => {
                          setUserFormData({
                            firstName: userProfile.firstName,
                            lastName: userProfile.lastName,
                          });
                          setError("");
                        }}
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
        )}

        {/* Security Tab */}
        {activeTab === "security" && userProfile && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Change Password - Left Column */}
            <div className="card border border-base-content/20">
              <div className="card-body">
                <h2 className="card-title text-title-lg mb-4">
                  Change Password
                </h2>

                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div className="form-control">
                    <label className="label pb-1">
                      <span className="label-text">Current Password</span>
                    </label>
                    <div className="relative">
                      <input
                        type={
                          passwordForm.showCurrentPassword ? "text" : "password"
                        }
                        placeholder="Enter your current password"
                        className="input input-bordered w-full pr-10"
                        value={passwordForm.currentPassword}
                        onChange={(e) =>
                          setPasswordForm({
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
                          setPasswordForm({
                            ...passwordForm,
                            showCurrentPassword:
                              !passwordForm.showCurrentPassword,
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
                        type={
                          passwordForm.showNewPassword ? "text" : "password"
                        }
                        placeholder="Enter new password"
                        className="input input-bordered w-full pr-10"
                        value={passwordForm.newPassword}
                        onChange={(e) =>
                          setPasswordForm({
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
                          setPasswordForm({
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
                        type={
                          passwordForm.showConfirmPassword ? "text" : "password"
                        }
                        placeholder="Confirm new password"
                        className="input input-bordered w-full pr-10"
                        value={passwordForm.confirmPassword}
                        onChange={(e) =>
                          setPasswordForm({
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
                          setPasswordForm({
                            ...passwordForm,
                            showConfirmPassword:
                              !passwordForm.showConfirmPassword,
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
                    {showSuccessTick && (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <span className="text-sm font-bold text-green-600">
                          Saved!
                        </span>
                      </div>
                    )}
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
                  <h2 className="card-title text-title-lg">
                    Email Verification
                  </h2>
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
                        <div className="font-medium">{userProfile.email}</div>
                        <div className="text-sm text-base-content/70">
                          {/* FIXME Check email validation here */}
                          {true
                            ? "Email is verified"
                            : "Email needs verification"}
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
        )}
      </div>
    </div>
  );
}
