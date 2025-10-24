import Image from "next/image";
import Link from "next/link";
import { getBlogSettings } from "@/services/setting-api";
import { ApiBlogSetting } from "@/types/setting";

export default async function HeaderBrand() {
  const settings: ApiBlogSetting | null = await getBlogSettings();

  return (
    <Link href="/articles">
      <div className="flex flex-row items-center">
        <div className="mr-2">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <Image
                alt={settings?.blogTitle ?? "Blog Logo"}
                src={settings?.blogLogoUrl ?? ""}
                width={300}
                height={300}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-title-md">{settings?.blogTitle}</p>
          <p className="text-label-md text-base-content/70">
            {settings?.blogSubtitle}
          </p>
        </div>
      </div>
    </Link>
  );
}
