import React from "react";
import { XCircle, AlertTriangle, Info } from "lucide-react";

export type ConfirmationModalType = "danger" | "info" | "warning";

interface ConfirmationModalProps {
  type?: ConfirmationModalType;
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmationModal({
  open,
  type = "info",
  title = "Confirm",
  description = "Please confirm your action.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onCancel,
  onConfirm,
}: ConfirmationModalProps) {
  if (!open) return null;
  // Prevent closing when clicking inside modal
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-base-100 rounded-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-2">
          {type === "danger" && <XCircle className="w-7 h-7 text-error" />}
          {type === "warning" && (
            <AlertTriangle className="w-7 h-7 text-warning" />
          )}
          {type === "info" && <Info className="w-7 h-7 text-info" />}
          <h3 className="text-title-lg m-0">{title}</h3>
        </div>
        <p className="mb-4">{description}</p>
        <div className="flex justify-end gap-2">
          <button className="btn btn-outline" onClick={onCancel}>
            {cancelText}
          </button>
          <button
            className={
              type === "danger"
                ? "btn bg-error text-white hover:bg-error/80"
                : type === "warning"
                ? "btn bg-warning text-white hover:bg-warning/80"
                : "btn bg-info text-white hover:bg-info/80"
            }
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
