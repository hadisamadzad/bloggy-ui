import { getBlogSettings } from "@/services/setting-api";

export default async function Copyright() {
  const settings = await getBlogSettings();
  return (
    <footer className="mt-20 w-full" data-theme="dark">
      <div className="flex max-w-[1440px] h-auto sm:h-8  py-2 px-4 sm:px-6 md:px-12 lg:px-24 mx-auto items-center justify-center">
        <p className="text-body-sm text-center">
          {settings?.copyrightText ||
            "Copyright © 2025 Bloggy. All rights reserved."}
        </p>
      </div>
    </footer>
  );
}
