"use client";

import { AlertCircle, X } from "lucide-react";

interface ErrorAlertProps {
  error: string;
  onDismiss: () => void;
}

export default function ErrorAlert({ error, onDismiss }: ErrorAlertProps) {
  if (!error) return null;

  return (
    <div className="alert alert-error mb-6">
      <AlertCircle className="w-6 h-6" />
      <span className="flex-1">{error}</span>
      <button onClick={onDismiss} className="btn btn-ghost btn-sm btn-square">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
