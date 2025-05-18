import Image from "next/image";

export default function Header() {
  return (
    <header>
      <div className="w-full h-[72px] flex flex-row justify-between items-center px-24 py-3">
        <div className="flex flex-row items-center">
          <div className="mr-2">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <Image
                  alt="Profile Picture"
                  src="https://i.pravatar.cc/300?img=47"
                  width={300}
                  height={300}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-title-md">Maria Style</p>
            <p className="text-label-md text-base-content/70">UI/UX Designer</p>
          </div>
        </div>

        <div className="flex flex-row gap-2">
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
          <button className="btn btn-secondary text-label-lg">
            Join newsletter
          </button>
        </div>
      </div>
    </header>
  );
}
