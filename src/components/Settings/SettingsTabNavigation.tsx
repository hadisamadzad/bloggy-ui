"use client";

import { Globe, User, Shield } from "lucide-react";

export type SettingsTab = "blog" | "account" | "security";

interface SettingsTabNavigationProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

export default function SettingsTabNavigation({
  activeTab,
  onTabChange,
}: SettingsTabNavigationProps) {
  return (
    <div className="tabs tabs-boxed mb-6">
      <button
        className={`tab ${activeTab === "blog" ? "tab-active" : ""}`}
        onClick={() => onTabChange("blog")}
      >
        <Globe className="w-4 h-4 mr-2" />
        Blog Settings
      </button>
      <button
        className={`tab ${activeTab === "account" ? "tab-active" : ""}`}
        onClick={() => onTabChange("account")}
      >
        <User className="w-4 h-4 mr-2" />
        Account
      </button>
      <button
        className={`tab ${activeTab === "security" ? "tab-active" : ""}`}
        onClick={() => onTabChange("security")}
      >
        <Shield className="w-4 h-4 mr-2" />
        Security
      </button>
    </div>
  );
}
