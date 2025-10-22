"use client";

export default function SettingsHeader() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <h1 className="text-headline-md">Settings</h1>
      </div>
      <p className="text-body-md text-base-content/70">
        Manage blog configuration and account settings
      </p>
    </div>
  );
}
