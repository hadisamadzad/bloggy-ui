"use client";

import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { Tag } from "@/types/tag";

interface TagSelectorProps {
  tags: Tag[];
  selectedTagIds: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
  maxTags?: number;
}

export default function TagSelector({
  tags,
  selectedTagIds,
  onChange,
  disabled = false,
  maxTags = 6,
}: TagSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get selected tags objects from IDs
  const selectedTags = tags.filter((tag) => selectedTagIds.includes(tag.tagId));

  // Filter tags based on search and exclude already selected
  const filteredTags = tags.filter(
    (tag) =>
      (tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tag.slug.toLowerCase().includes(searchTerm.toLowerCase())) &&
      !selectedTagIds.includes(tag.tagId)
  );

  // Show dropdown when focused and there are filtered tags or search term
  const showDropdown =
    isFocused && (filteredTags.length > 0 || searchTerm.length > 0);

  // Check if max tags limit is reached
  const isMaxTagsReached = selectedTagIds.length >= maxTags;

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0) {
      const highlightedElement = document.querySelector(
        `[data-tag-index="${highlightedIndex}"]`
      );
      if (highlightedElement) {
        highlightedElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [highlightedIndex]);

  const handleAddTag = (tagId: string) => {
    // Check if max tags limit is reached
    if (selectedTagIds.length >= maxTags) {
      return;
    }
    onChange([...selectedTagIds, tagId]);
    setSearchTerm("");
    inputRef.current?.focus();
  };

  const handleRemoveTag = (tagId: string) => {
    onChange(selectedTagIds.filter((id) => id !== tagId));
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsFocused(true);
    setHighlightedIndex(-1); // Reset highlight when typing
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle arrow keys for navigation
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredTags.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      // Add highlighted tag on Enter
      e.preventDefault();
      if (filteredTags[highlightedIndex]) {
        handleAddTag(filteredTags[highlightedIndex].tagId);
        setHighlightedIndex(-1);
      }
    } else if (e.key === "Escape") {
      // Close dropdown on Escape
      e.preventDefault();
      setIsFocused(false);
      setHighlightedIndex(-1);
    } else if (
      e.key === "Backspace" &&
      searchTerm === "" &&
      selectedTags.length > 0
    ) {
      // Remove last tag on backspace if input is empty
      handleRemoveTag(selectedTags[selectedTags.length - 1].tagId);
    }
  };

  return (
    <div className="form-control col-span-2" ref={dropdownRef}>
      <label className="label">
        <span className="label-text font-medium">Tags: </span>
        <span
          className={`label-text-alt ${isMaxTagsReached ? "text-info" : ""}`}
        >
          {selectedTags.length} / {maxTags} tags selected
        </span>
      </label>

      <div className="relative w-full">
        {/* Input Field with Chips Inside */}
        <div
          className={`input input-bordered w-full min-h-[3rem] h-auto flex flex-wrap items-center gap-2 p-2 cursor-text ${
            isFocused ? "input-primary" : ""
          }`}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Selected Tags as Chips */}
          {selectedTags.map((tag) => (
            <div
              key={tag.tagId}
              className="bg-base-content/10 text-label-md py-1 pl-4 pr-2 rounded-full"
            >
              <span>{tag.name}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveTag(tag.tagId);
                }}
                className="btn btn-xs btn-circle rounded-full btn-ghost ml-1"
                disabled={disabled}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}

          {/* Input Field */}
          <input
            ref={inputRef}
            type="text"
            placeholder={
              isMaxTagsReached
                ? "Max tags reached"
                : selectedTags.length === 0
                ? "Type to search tags..."
                : ""
            }
            className="flex-1 min-w-[120px] outline-none bg-transparent"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyDown={handleKeyDown}
            disabled={disabled || isMaxTagsReached}
          />
        </div>

        {/* Dropdown Menu */}
        {showDropdown && !isMaxTagsReached && (
          <div className="absolute z-50 w-full mt-1 bg-base-100 rounded-box p-2 border border-base-300 max-h-60 overflow-y-auto">
            {/* Tag Options */}
            {filteredTags.length > 0 ? (
              <ul className="menu menu-compact p-0 w-full">
                {filteredTags.map((tag, index) => (
                  <li key={tag.tagId} data-tag-index={index}>
                    <button
                      type="button"
                      onClick={() => {
                        handleAddTag(tag.tagId);
                        setHighlightedIndex(-1);
                      }}
                      className={`flex items-center justify-between gap-24 hover:bg-base-200 ${
                        index === highlightedIndex
                          ? "bg-primary text-primary-content"
                          : ""
                      }`}
                      onMouseEnter={() => setHighlightedIndex(index)}
                    >
                      <span>{tag.name}</span>
                      <span
                        className={`badge badge-sm ${
                          index === highlightedIndex
                            ? "badge-primary-content"
                            : "badge-ghost"
                        }`}
                      >
                        {tag.slug}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-center text-base-content/60 text-sm">
                {searchTerm ? "No tags found" : "Start typing to search tags"}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Helper Text */}
      <label className="label pt-1">
        <span className="text-base-content/60">
          {isMaxTagsReached
            ? `Maximum ${maxTags} tags reached. Remove a tag to add more.`
            : "↑↓ Navigate • Enter to select • Backspace to remove • Esc to close"}
        </span>
      </label>
    </div>
  );
}
