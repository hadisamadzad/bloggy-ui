import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

interface ToastBarProps {
  open: boolean;
  message: ToastMessage;
  onClose?: () => void;
}

export interface ToastMessage {
  type: "success" | "error" | "info" | "warning";
  text: string;
  autoHide?: boolean;
  autoHideDelayMs?: number;
}

export default function ToastBar({ open, message, onClose }: ToastBarProps) {
  const [visible, setVisible] = useState(open);
  // Default autoHide to true if not provided
  const autoHide =
    typeof message.autoHide === "boolean" ? message.autoHide : true;
  useEffect(() => {
    setVisible(open);
  }, [open]);

  useEffect(() => {
    if (visible && autoHide) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (typeof onClose === "function") {
          onClose();
        }
      }, message.autoHideDelayMs || 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, autoHide, message.autoHideDelayMs, onClose]);

  if (!visible) return null;

  let icon = null;
  switch (message.type) {
    case "success":
      icon = <CheckCircle className="w-6 h-6 text-success/100" />; // green
      break;
    case "error":
      icon = <XCircle className="w-6 h-6 text-error/100" />; // red
      break;
    case "warning":
      icon = <AlertTriangle className="w-6 h-6 text-warning/100" />; // amber
      break;
    case "info":
      icon = <Info className="w-6 h-6 text-info/100" />; // blue
      break;
    default:
      icon = null;
  }

  return (
    <div className="toast toast-start toast-bottom mb-8 z-50">
      <div className="alert bg-secondary text-primary shadow-md hover:border-1 transition-shadow duration-100 flex items-center gap-3">
        {icon}
        <span className="text-label-lg">{message.text}</span>
        {!autoHide && (
          <button
            type="button"
            className="hover:cursor-pointer"
            aria-label="Close"
            onClick={() => {
              setVisible(false);
              if (typeof onClose === "function") onClose();
            }}
          >
            <X className="w-5 h-5 text-primary" />
          </button>
        )}
      </div>
    </div>
  );
}
