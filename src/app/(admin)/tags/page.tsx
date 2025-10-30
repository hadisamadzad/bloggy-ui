"use client";

import { useEffect, useState } from "react";
import { listTags, createTag, updateTag, deleteTag } from "@/services/tag-api";
import { Tag } from "@/types/tag";
import { Pencil, Trash2 } from "lucide-react";
import ConfirmationModal from "@/components/Common/ConfirmationModal";
import EditTagModal from "@/components/Tags/EditTagModal";
import ToastBar from "@/components/Common/ToastBar";
import type { ToastMessage } from "@/components/Common/ToastBar";

export default function ManageTagsPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTagName, setNewTagName] = useState("");
  const [newTagSlug, setNewTagSlug] = useState("");
  const [creating, setCreating] = useState(false);
  // Edit state
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");
  const [editing, setEditing] = useState(false);

  // Delete state
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [tagToDelete, setTagToDelete] = useState<Tag | null>(null);
  const [processingDelete, setProcessingDelete] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<ToastMessage | null>(null);

  useEffect(() => {
    setLoading(true);
    listTags()
      .then(setTags)
      .catch(() => setError("Failed to fetch tags."))
      .finally(() => setLoading(false));
  }, []);

  // Centralize error -> toast behavior so callers only set `error`.
  useEffect(() => {
    if (error) {
      setToastMessage({ type: "error", text: error });
      setToastOpen(true);
    }
  }, [error]);

  const handleCreateTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagName || !newTagSlug) return;
    setCreating(true);
    setError(null);
    try {
      const createdTagId = await createTag({
        name: newTagName,
        slug: newTagSlug,
      });
      setTags((prev) => [
        ...prev,
        { tagId: createdTagId, name: newTagName, slug: newTagSlug },
      ]);
      setNewTagName("");
      setNewTagSlug("");
      setToastMessage({ type: "success", text: "Tag created" });
      setToastOpen(true);
    } catch {
      setError("Failed to create tag.");
    } finally {
      // keep loader visible briefly to avoid flicker
      setTimeout(() => setCreating(false), 700);
    }
  };

  const openEdit = (tag: Tag) => {
    setEditingTag(tag);
    setEditName(tag.name);
    setEditSlug(tag.slug);
  };

  const closeEdit = () => {
    setEditingTag(null);
    setEditName("");
    setEditSlug("");
  };
  const handleUpdateTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTag) return;
    setEditing(true);
    setError(null);
    try {
      const ok = await updateTag({
        tagId: editingTag.tagId,
        name: editName,
        slug: editSlug,
      });
      if (!ok) throw new Error("Update failed");
      setTags((prev) =>
        prev.map((t: Tag) =>
          t.tagId === editingTag.tagId
            ? { ...t, name: editName, slug: editSlug }
            : t
        )
      );
      closeEdit();
      setToastMessage({ type: "success", text: "Tag updated" });
      setToastOpen(true);
    } catch {
      setError("Failed to update tag.");
    } finally {
      // brief delay so users see the saving spinner
      setTimeout(() => setEditing(false), 700);
    }
  };

  const openDelete = (tag: Tag) => {
    setTagToDelete(tag);
    setConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!tagToDelete) return;
    setProcessingDelete(true);
    setError(null);
    try {
      await deleteTag(tagToDelete!.tagId);
      setTags((prev) => prev.filter((t) => t.tagId !== tagToDelete!.tagId));
      setConfirmDeleteOpen(false);
      setTagToDelete(null);
      setToastMessage({ type: "success", text: "Tag deleted" });
      setToastOpen(true);
    } catch {
      setError("Failed to delete tag.");
    } finally {
      setProcessingDelete(false);
    }
  };
  return (
    <div className="min-h-screen bg-base-100">
      {toastMessage && (
        <ToastBar
          open={toastOpen}
          message={toastMessage}
          onClose={() => setToastOpen(false)}
        />
      )}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-headline-md font-bold text-base-content mb-2">
              Manage Tags
            </h1>
            <p className="text-body-md text-base-content/70">
              Create and manage tags used across your articles.
            </p>
          </div>

          <div className="card border border-base-content/20 mb-6">
            <div className="card-body">
              <h2 className="card-title text-title-lg">Create Tag</h2>
              <form
                onSubmit={handleCreateTag}
                className="mt-4 grid grid-cols-5 gap-6 items-end"
              >
                <div className="col-span-2">
                  <label className="label pb-1">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Machine Learning"
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    className="input input-bordered w-full"
                    disabled={creating}
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="label pb-1">
                    <span className="label-text">Slug</span>
                  </label>
                  <input
                    type="text"
                    placeholder="machine-learning"
                    value={newTagSlug}
                    onChange={(e) => setNewTagSlug(e.target.value)}
                    className="input input-bordered w-full"
                    disabled={creating}
                    required
                  />
                </div>
                <div className="col-span-1 sm:col-span-1">
                  <button
                    type="submit"
                    className="btn btn-secondary w-full"
                    disabled={creating || !newTagName || !newTagSlug}
                  >
                    {creating ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Creating...
                      </>
                    ) : (
                      "Create Tag"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="card border border-base-content/20">
            <div className="card-body">
              <h2 className="card-title text-title-lg mb-2">Existing Tags</h2>
              {loading ? (
                <div>Loading tags...</div>
              ) : (
                <ul className="list bg-base-100 rounded-box border border-base-content/20">
                  <li className="list-row text-label-sm text-base-content/70">
                    Tags are displayed in creation order.
                  </li>
                  {tags.map((tag) => (
                    <li
                      key={tag.tagId}
                      className="list-row py-2 items-center font-medium"
                    >
                      <div className="text-title-sm h-6">{tag.name}</div>
                      <span className="text-label-lg lowercase opacity-60 h-6">
                        {tag.slug}
                      </span>

                      <button
                        className="btn btn-sm btn-outline btn-secondary"
                        aria-label={`Edit ${tag.name}`}
                        onClick={() => openEdit(tag)}
                      >
                        <Pencil className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline btn-error btn-dash gap-2"
                        aria-label={`Delete ${tag.name}`}
                        onClick={() => openDelete(tag)}
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <EditTagModal
            open={Boolean(editingTag)}
            tag={editingTag}
            name={editName}
            slug={editSlug}
            setName={setEditName}
            setSlug={setEditSlug}
            onClose={closeEdit}
            onSubmit={handleUpdateTag}
            saving={editing}
          />

          {/* Delete confirmation modal */}
          <ConfirmationModal
            open={Boolean(tagToDelete) && confirmDeleteOpen}
            type="danger"
            title={tagToDelete ? `Delete ${tagToDelete.name}?` : "Delete"}
            description={
              tagToDelete
                ? `Are you sure you want to delete the tag "${tagToDelete.name}"? This action cannot be undone.`
                : "Are you sure?"
            }
            confirmText={processingDelete ? "Deleting..." : "Delete"}
            cancelText="Cancel"
            onCancel={() => setConfirmDeleteOpen(false)}
            onConfirm={handleConfirmDelete}
          />
        </div>
      </div>
    </div>
  );
}
