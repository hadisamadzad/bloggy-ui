export interface ApiSocial {
  order: number;
  name: SocialNetworkName;
  url: string;
}

export interface ApiSetting {
  blogTitle: string;
  blogSubtitle: string;
  blogPageTitle: string;
  blogDescription: string;
  seoMetaTitle: string;
  seoMetaDescription: string;
  blogUrl: string;
  blogLogoUrl: string;
  socials: ApiSocial[];
  updatedAt: string;
}

export enum SocialNetworkName
{
    Medium = "Medium",
    Twitter = "Twitter",
    Linkedin = "Linkedin",
    Youtube = "Youtube",
    Github = "Github",
    StackOverflow = "StackOverflow",
    Devto = "Devto",
    Instagram = "Instagram",
    Facebook = "Facebook",
    Reddit = "Reddit",
    Discord = "Discord",
    Dribbble = "Dribbble",
    Behance = "Behance",
    Unsplash = "Unsplash",
}