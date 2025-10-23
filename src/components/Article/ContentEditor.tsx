"use client";

import { Hash, Eye, Edit3 } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ContentEditorProps {
  content: string;
  handleContentChange: (value: string) => void;
}

type ContentPreviewMode = "edit" | "preview" | "split";

export default function ContentEditor({
  content,
  handleContentChange,
}: ContentEditorProps) {
  const [contentPreviewMode, setContentPreviewMode] =
    useState<ContentPreviewMode>("split");

  return (
    <div className="card border border-base-content/20">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h2 className="card-title text-title-lg flex items-center gap-2">
            <Edit3 className="w-5 h-5" />
            Article Content
          </h2>
          <div className="tabs tabs-boxed">
            <button
              type="button"
              className={`tab ${
                contentPreviewMode === "edit" ? "tab-active" : ""
              }`}
              onClick={() => setContentPreviewMode("edit")}
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Edit
            </button>
            <button
              type="button"
              className={`tab ${
                contentPreviewMode === "split" ? "tab-active" : ""
              }`}
              onClick={() => setContentPreviewMode("split")}
            >
              <Hash className="w-4 h-4 mr-2" />
              Split
            </button>
            <button
              type="button"
              className={`tab ${
                contentPreviewMode === "preview" ? "tab-active" : ""
              }`}
              onClick={() => setContentPreviewMode("preview")}
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </button>
          </div>
        </div>

        <div
          className={`grid gap-6 ${
            contentPreviewMode === "split" ? "lg:grid-cols-2" : "grid-cols-1"
          }`}
        >
          {(contentPreviewMode === "edit" ||
            contentPreviewMode === "split") && (
            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text font-medium">
                  Markdown Content * [Supports GitHub flavoured markdown]
                </span>
              </label>
              <textarea
                className="textarea textarea-bordered font-mono text-sm leading-relaxed h-96 w-full"
                value={content}
                onChange={(e) => handleContentChange(e.target.value)}
                placeholder={`# Your Article Title

## Introduction
Start writing your article content here. You can use **bold**, *italic*, and other markdown features.

### Code Examples
\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### Lists
- Item 1
- Item 2
- Item 3

[Links work too](https://example.com)

> Blockquotes for important notes

Remember to make your content engaging and informative!`}
                required
              />
            </div>
          )}

          {(contentPreviewMode === "preview" ||
            contentPreviewMode === "split") && (
            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text font-medium">Live Preview</span>
              </label>
              <div className="border border-base-content/20 rounded-lg p-4 bg-base-50 h-96 overflow-y-auto">
                {content ? (
                  <div className="prose prose-base max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-center">
                    <div>
                      <Eye className="w-12 h-12 text-base-content/30 mx-auto mb-4" />
                      <p className="text-base-content/50 italic">
                        Start writing to see your content come to life...
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
