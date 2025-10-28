"use client";
import { useState } from "react";
import { subscribeToBlog } from "@/services/subscriber-api";

interface SubscribeModalProps {
  open: boolean;
  onClose: () => void;
  onSubscribed?: (
    message: string,
    type?: "success" | "error" | "info" | "warning"
  ) => void;
}

export default function SubscribeModal({
  open,
  onClose,
  onSubscribed,
}: SubscribeModalProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const succeeded = await subscribeToBlog(email);
    setIsLoading(false);
    if (succeeded) {
      setEmail("");
      if (typeof onSubscribed === "function") {
        onSubscribed("Subscribed successfully!", "success");
      }
      onClose();
    } else {
      if (typeof onSubscribed === "function") {
        onSubscribed("Subscription failed.", "error");
      }
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-base-100 rounded-lg shadow-lg p-6 w-full max-w-md border border-base-content/20">
        <h2 className="text-title-lg mb-2">Join my newsletter</h2>
        <p className="mb-4 text-body-md">
          Get the latest articles delivered to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            className="input input-bordered w-full"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
            disabled={isLoading}
          />
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-secondary"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Subscribe"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
