"use client";

import { SocialLink, SocialNetworkName } from "@/types/setting";
import { LinkIcon, Plus, Trash2, Move } from "lucide-react";

interface SocialLinksManagerProps {
  socials: SocialLink[];
  onSocialsChange: (socials: SocialLink[]) => void;
}

export default function SocialLinksManager({
  socials,
  onSocialsChange,
}: SocialLinksManagerProps) {
  const addSocialLink = () => {
    const newOrder = Math.max(...socials.map((s) => s.order), 0) + 1;
    onSocialsChange([
      ...socials,
      { order: newOrder, name: SocialNetworkName.Twitter, url: "" },
    ]);
  };

  const removeSocialLink = (index: number) => {
    onSocialsChange(socials.filter((_, i) => i !== index));
  };

  const updateSocialLink = (
    index: number,
    field: "name" | "url",
    value: string | SocialNetworkName
  ) => {
    const updatedSocials = [...socials];
    if (field === "name") {
      updatedSocials[index][field] = value as SocialNetworkName;
    } else {
      updatedSocials[index][field] = value as string;
    }
    onSocialsChange(updatedSocials);
  };

  return (
    <div className="card border border-base-content/20">
      <div className="card-body">
        <div className="flex items-center justify-between ">
          <h2 className="card-title text-title-lg mb-4">Social Links</h2>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={addSocialLink}
          >
            <Plus className="w-4 h-4" />
            Add Link
          </button>
        </div>

        <div className="space-y-3">
          {socials.map((social, index) => (
            <div key={index} className="flex gap-3 items-center">
              <div className="flex items-center gap-2 text-base-content/50">
                <Move className="w-4 h-4" />
                <span className="text-sm">#{social.order}</span>
              </div>
              <select
                className="select select-bordered flex-1"
                value={social.name}
                onChange={(e) =>
                  updateSocialLink(
                    index,
                    "name",
                    e.target.value as SocialNetworkName
                  )
                }
              >
                {Object.values(SocialNetworkName).map((networkName) => (
                  <option key={networkName} value={networkName}>
                    {networkName}
                  </option>
                ))}
              </select>
              <input
                type="url"
                placeholder="https://example.com/profile"
                className="input input-bordered flex-1"
                value={social.url}
                onChange={(e) => updateSocialLink(index, "url", e.target.value)}
              />
              <button
                type="button"
                className="btn btn-outline btn-error"
                onClick={() => removeSocialLink(index)}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          {socials.length === 0 && (
            <div className="text-center py-8 text-base-content/50">
              <LinkIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No social links added yet</p>
              <p className="text-sm">
                Click &ldquo;Add Link&rdquo; to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
