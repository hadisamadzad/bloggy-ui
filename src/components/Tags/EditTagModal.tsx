"use client";

import React from "react";
import { Tag } from "@/types/tag";

interface EditTagModalProps {
  open: boolean;
  tag: Tag | null;
  name: string;
  slug: string;
  setName: (value: string) => void;
  setSlug: (value: string) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void> | void;
  saving?: boolean;
}

export default function EditTagModal({
  open,
  tag,
  name,
  slug,
  setName,
  setSlug,
  onClose,
  onSubmit,
  saving = false,
}: EditTagModalProps) {
  if (!open || !tag) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={() => onClose()}
    >
      <div
        className="bg-base-100 rounded-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-title-lg mb-2">Edit Tag</h3>
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="form-control">
              <label className="label pb-1">
                <span className="text-label-lg font-medium">Name</span>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control">
              <label className="label pb-1">
                <span className="text-label-lg font-medium">Slug</span>
              </label>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => onClose()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-secondary"
              disabled={saving}
            >
              {saving ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
