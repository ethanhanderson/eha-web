import { withBasePath } from "../utils";
import type { Platform } from "./platform-types";
import { PLATFORMS } from "./platform-types";

export interface PlatformConfig {
  name: string;
  logo: string; // Path to SVG logo in /public/platforms/
  brandColor: string; // Primary brand color (hex)
  brandColorLight: string; // Lighter variant for backgrounds
  buttonColor?: string; // Optional override for button background color
  profileUrl: (username: string) => string;
  ctaLabel: string; // Default CTA text (e.g., "Follow", "Subscribe")
  ctaLabelWithCount: (count: number) => string;
  buttonClassName?: string; // Tailwind classes for button styling (e.g., "rounded-full")
}

export const platformConfigs: Record<Platform, PlatformConfig> = {
  [PLATFORMS.TWITCH]: {
    name: "Twitch",
    logo: withBasePath("/platforms/twitch.svg"),
    brandColor: "#8A4DFF",
    brandColorLight: "#9246ff",
    profileUrl: (username) => `https://twitch.tv/${username}`,
    ctaLabel: "Follow",
    ctaLabelWithCount: (count) => `${formatCount(count)} Followers`,
    buttonClassName: "rounded-full",
  },
  [PLATFORMS.YOUTUBE]: {
    name: "YouTube",
    logo: withBasePath("/platforms/youtube.svg"),
    brandColor: "#FF0000",
    brandColorLight: "#ffffff",
    profileUrl: (username) => `https://youtube.com/@${username}`,
    ctaLabel: "Subscribe",
    ctaLabelWithCount: (count) => `${formatCount(count)} Subscribers`,
    buttonClassName: "rounded-full",
  },
  [PLATFORMS.KICK]: {
    name: "Kick",
    logo: withBasePath("/platforms/kick.svg"),
    brandColor: "#53FC18",
    brandColorLight: "#000000",
    profileUrl: (username) => `https://kick.com/${username}`,
    ctaLabel: "Follow",
    ctaLabelWithCount: (count) => `${formatCount(count)} Followers`,
    buttonClassName: "rounded text-black", // Kick uses black text on green button
  },
  [PLATFORMS.INSTAGRAM]: {
    name: "Instagram",
    logo: withBasePath("/platforms/instagram.svg"),
    brandColor: "#FE4A05", // Orange from the logo gradient to differentiate from TikTok/YouTube
    brandColorLight: "#FE4A0520",
    buttonColor: "#0095F6", // Official Instagram Blue for CTA
    profileUrl: (username) => `https://instagram.com/${username}`,
    ctaLabel: "Follow",
    ctaLabelWithCount: (count) => `${formatCount(count)} Followers`,
    buttonClassName: "rounded-lg",
  },
  [PLATFORMS.X]: {
    name: "X",
    logo: withBasePath("/platforms/twitter.svg"),
    brandColor: "#1DA1F2", // Twitter Blue to match the bird logo
    brandColorLight: "#ffffff",
    profileUrl: (username) => `https://x.com/${username}`,
    ctaLabel: "Follow",
    ctaLabelWithCount: (count) => `${formatCount(count)} Followers`,
    buttonClassName: "rounded-full",
  },
  [PLATFORMS.TIKTOK]: {
    name: "TikTok",
    logo: withBasePath("/platforms/tiktok.svg"),
    brandColor: "#FE2C55",
    brandColorLight: "#000000",
    profileUrl: (username) => `https://tiktok.com/@${username}`,
    ctaLabel: "Follow",
    ctaLabelWithCount: (count) => `${formatCount(count)} Followers`,
    buttonClassName: "rounded",
  },
};

// Helper to format large numbers (e.g., 1.2K, 1.5M)
export function formatCount(count: number): string {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  }
  return count.toString();
}

// Get platform config by platform enum
export function getPlatformConfig(platform: Platform): PlatformConfig {
  return platformConfigs[platform];
}
