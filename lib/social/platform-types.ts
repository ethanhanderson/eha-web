export type Platform =
  | "TWITCH"
  | "YOUTUBE"
  | "KICK"
  | "INSTAGRAM"
  | "X"
  | "TIKTOK";

export const PLATFORMS = {
  TWITCH: "TWITCH",
  YOUTUBE: "YOUTUBE",
  KICK: "KICK",
  INSTAGRAM: "INSTAGRAM",
  X: "X",
  TIKTOK: "TIKTOK",
} as const;
