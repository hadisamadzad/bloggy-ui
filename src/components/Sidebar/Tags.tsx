"use client";

import Tag from "../Common/Tag";

export default function Tags() {
  return (
    <div className="h-fit max-h-[500px] p-4 rounded-lg border border-base-content/30">
      <h2 className="text-title-sm">Top tags</h2>
      <div className="divider" />
      <div className="flex flex-wrap gap-2 max-h-[350px] overflow-scroll text-base-content/90">
        <Tag name="design-process" />
        <Tag name="user-testing" />
        <Tag name="ideation" />
        <Tag name="navigation" />
        <Tag name="team-management" />
        <Tag name="strategy" />
        <Tag name="design-patterns" />
        <Tag name="design-process" />
        <Tag name="design" />
        <Tag name="navigation" />
        <Tag name="team-management" />
        <Tag name="strategy" />
        <Tag name="design-patterns" />
        <Tag name="design-process" />
        <Tag name="design" />
        <Tag name="navigation" />
        <Tag name="team-management" />
        <Tag name="strategy" />
        <Tag name="design-patterns" />
        <Tag name="design-process" />
        <Tag name="design" />
        <Tag name="navigation" />
        <Tag name="team-management" />
        <Tag name="strategy" />
        <Tag name="design-patterns" />
        <Tag name="design-process" />
      </div>
      <div className="flex justify-end">
        <button className="btn btn-link text-base-content/80 w-auto text-label-lg">
          More tags
        </button>
      </div>
    </div>
  );
}
