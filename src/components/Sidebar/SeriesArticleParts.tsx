"use client";

export default function SeriesArticleParts() {
  return (
    <div className="h-fit max-h-[600px] p-4 rounded-lg border border-base-content/30">
      <h2 className="text-title-sm">
        <span className="italic">Design strategies</span> (10 parts)
      </h2>
      <div className="divider" />
      <div className="flex flex-col text-body-md text-base-content/90 gap-1">
        <a className="py-2 pl-1 hover:bg-base-content/20 rounded-lg" href="">
          Part 1: Low-Fidelity Wireframes
        </a>
        <a className="py-2 pl-1  hover:bg-base-content/20 rounded-lg" href="">
          Part 2: Interactive Prototypes with Figma
        </a>
        <a className="py-2 pl-1  hover:bg-base-content/20 rounded-lg" href="">
          Part 3: Creating Design Systems
        </a>
        <a className="py-2 pl-1  hover:bg-base-content/20 rounded-lg" href="">
          Part 4: Testing with Clickable Prototypes
        </a>
        <a className="py-2 pl-1  hover:bg-base-content/20 rounded-lg" href="">
          Part 5: Creating Design Systems
        </a>
        <a className="py-2 pl-1  hover:bg-base-content/20 rounded-lg" href="">
          Part 6: Creating Design Systems
        </a>
        <a className="py-2 pl-1  hover:bg-base-content/20 rounded-lg" href="">
          Part 7: Creating Design Systems
        </a>
        <a className="py-2 pl-1  hover:bg-base-content/20 rounded-lg" href="">
          Part 8: Creating Design Systems
        </a>
        <a className="py-2 pl-1  hover:bg-base-content/20 rounded-lg" href="">
          Part 9: Creating Design Systems
        </a>
        <a className="py-2 pl-1  hover:bg-base-content/20 rounded-lg" href="">
          Part 10: Creating Design Systems
        </a>
      </div>
      <div className="flex justify-end mt-2">
        <button className="btn btn-link text-base-content/80 w-auto text-label-lg">
          More tags
        </button>
      </div>
    </div>
  );
}
