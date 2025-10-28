"use server";
import Image from "next/image";
import {
  FaGithub,
  FaLinkedin,
  FaDribbble,
  FaMedium,
  FaUnsplash,
  FaBehance,
  FaDiscord,
  FaReddit,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaDev,
  FaStackOverflow,
} from "react-icons/fa";

import React, { JSX } from "react";

const socialIcons: Record<string, JSX.Element> = {
  github: <FaGithub size={24} />,
  linkedin: <FaLinkedin size={24} />,
  medium: <FaMedium size={24} />,
  twitter: <FaTwitter size={24} />,
  youtube: <FaYoutube size={24} />,
  stackoverflow: <FaStackOverflow size={24} />,
  devto: <FaDev size={24} />,
  instagram: <FaInstagram size={24} />,
  facebook: <FaFacebook size={24} />,
  reddit: <FaReddit size={24} />,
  discord: <FaDiscord size={24} />,
  dribbble: <FaDribbble size={24} />,
  behance: <FaBehance size={24} />,
  unsplash: <FaUnsplash size={24} />,
};

export interface AboutMeProps {
  authorName: string;
  aboutAuthor: string;
  imageUrl: string;
  socialLinks: { name: string; url: string }[];
}

export default async function AboutMe({
  authorName,
  aboutAuthor,
  imageUrl,
  socialLinks,
}: AboutMeProps) {
  return (
    <div className="p-4 rounded-lg border border-base-content/30">
      <h2 className="text-title-sm">About me</h2>
      <div className="divider" />
      <div className="flex flex-col items-center gap-4">
        <Image
          alt="Profile Picture"
          src={imageUrl}
          className="rounded-full object-cover"
          width={112}
          height={112}
        />
        <p className="text-title-lg">{authorName}</p>
        <p className="w-full text-body-md">{aboutAuthor}</p>
        <div className="flex w-full mt-12 items-center justify-between">
          <div className=" flex gap-3 justify-end">
            {(socialLinks || []).map((s, idx) =>
              s?.url ? (
                <a
                  key={idx}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 flex justify-center items-center bg-white text-secondary"
                >
                  {socialIcons[s.name.toLowerCase()] || (
                    <span
                      className="w-6 h-6 rounded-full bg-base-200 flex items-center justify-center text-xs font-bold text-base-content border border-base-content/20"
                      title={s.name}
                    >
                      {s.name.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </a>
              ) : null
            )}
          </div>
          {/*Temporarily disabled*/}
          {/*<button className="btn btn-secondary text-label-lg">
            Get in touch
          </button>*/}
        </div>
      </div>
    </div>
  );
}
