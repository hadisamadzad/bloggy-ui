"use client";

import { FormEvent } from "react";

export default function HeaderInteractive() {
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    // TODO: Handle search logic
    console.log("Search submitted");
  };

  const handleNewsletter = () => {
    // TODO: Handle newsletter signup
    console.log("Newsletter signup clicked");
  };

  return (
    <div className="flex flex-row gap-2">
      <form onSubmit={handleSearch}>
        <label className="input w-72 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-5 w-5 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Search for a keyword ..."
          />
        </label>
      </form>
      <button
        className="btn btn-secondary text-label-lg"
        onClick={handleNewsletter}
      >
        Join newsletter
      </button>
    </div>
  );
}
