export default function Header() {
  return (
    <header>
      <div className="w-full h-[72px] flex flex-row justify-between items-center px-24 py-3">
        <div className="flex flex-row items-center">
          <div className="mr-2">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img
                  alt="Profile Picture"
                  src="https://i.pravatar.cc/300?img=47"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-title-md text-neutral-950">Maria Style</p>
            <p className="text-label-md text-neutral-500">UI/UX Designer</p>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <label className="input input-bordered w-72 border-neutral-500 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
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
          <button
            className="btn text-neutral-50 w-auto text-label-lg"
            data-theme="dark"
          >
            Join newsletter
          </button>
        </div>
      </div>
    </header>
  );
}
