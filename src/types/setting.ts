export interface SocialLink {
  order: number;
  name: SocialNetworkName;
  url: string;
}

export interface ApiBlogSetting {
  authorName: string;
  authorTitle: string;
  aboutAuthor: string;
  blogTitle: string;
  blogSubtitle: string;
  blogDescription: string;
  blogUrl: string;
  pageTitleTemplate: string;
  seoMetaTitle: string;
  seoMetaDescription: string;
  blogLogoUrl: string;
  socials: SocialLink[];
  copyrightText: string;
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