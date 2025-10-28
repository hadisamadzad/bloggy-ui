"use client";

import { FormEvent, useState } from "react";
import ToastBar from "@/components/Common/ToastBar";
import type { ToastMessage } from "@/components/Common/ToastBar";
import SubscribeModal from "./SubscribeModal";

export default function HeaderInteractive() {
  const [modalOpen, setModalOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<ToastMessage | null>(null);
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    // TODO: Handle search logic
    console.log("Search submitted");
  };
  const handleNewsletter = () => {
    setModalOpen(true);
  };

  return (
    <div className="flex flex-row gap-2">
      {toastMessage && (
        <ToastBar
          open={toastOpen}
          message={toastMessage}
          onClose={() => setToastOpen(false)}
        />
      )}
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
      <SubscribeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubscribed={(msg, type = "success") => {
          setToastMessage({
            type,
            text: msg,
          });
          setToastOpen(true);
        }}
      />
    </div>
  );
}
