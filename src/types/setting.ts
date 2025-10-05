export interface ApiSocial {
  order: number;
  name: string;
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