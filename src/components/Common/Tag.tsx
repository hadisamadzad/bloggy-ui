"use client";

export interface TagProps {
  name: string;
}

export default function Tag({ name }: TagProps) {
  return (
    <div
      key={name}
      className="bg-base-content/10 text-label-lg py-2 px-4 rounded-full w-fit hover:bg-base-content/20"
    >
      <a href="">{name}</a>
    </div>
  );
}
