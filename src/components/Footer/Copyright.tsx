import { getBlogSettings } from "@/services/setting-api";

export default async function Copyright() {
  const settings = await getBlogSettings();
  return (
    <footer className="mt-20 w-full" data-theme="dark">
      <div className="flex max-w-[1440px] h-8 text-body-sm py-2 px-24 mx-auto items-center justify-center">
        <p>
          {settings?.copyrightText ||
            "Copyright © 2025 Bloggy. All rights reserved. Feel free to share our content, and we’d love it if you mention us as the source."}
        </p>
      </div>
    </footer>
  );
}
