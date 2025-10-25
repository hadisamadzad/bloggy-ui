import React from "react";

interface ArticleDeleteModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ArticleDeleteModal({
  open,
  onCancel,
  onConfirm,
}: ArticleDeleteModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-base-100 rounded-lg p-6 max-w-md">
        <h3 className="text-title-lg mb-2">Confirm Delete</h3>
        <p className="mb-4">
          Are you sure you want to delete this article? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-2">
          <button className="btn btn-outline" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-error" onClick={onConfirm}>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}
