import type { Platform } from "@/lib/social/platform-types";
import { PLATFORMS } from "@/lib/social/platform-types";
import { getPlatformConfig } from "@/lib/social/platforms";
import type { SocialCardData } from "@/lib/social/types";

interface AccountInput {
  platform: Platform;
  username: string;
}

interface SetDefinition {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
}

interface SetWithCards {
  set: { id: string; slug: string; title: string };
  cards: SocialCardData[];
}

// Static account definitions
const GAMING_ACCOUNTS: AccountInput[] = [
  { platform: PLATFORMS.TWITCH, username: "eha_game" },
  { platform: PLATFORMS.KICK, username: "eha_game" },
  { platform: PLATFORMS.YOUTUBE, username: "eha_game" },
  { platform: PLATFORMS.X, username: "eha_games" },
  { platform: PLATFORMS.INSTAGRAM, username: "eha_gaming" },
  { platform: PLATFORMS.TIKTOK, username: "eha_game" },
];

const CODING_ACCOUNTS: AccountInput[] = [
  { platform: PLATFORMS.TWITCH, username: "eha_code" },
  { platform: PLATFORMS.KICK, username: "eha_dev" },
  { platform: PLATFORMS.YOUTUBE, username: "eha_coding" },
  { platform: PLATFORMS.X, username: "eha_dev" },
  { platform: PLATFORMS.INSTAGRAM, username: "eha_coding" },
  { platform: PLATFORMS.TIKTOK, username: "eha_dev" },
];

// Set metadata
export const SET_METADATA: Record<string, { description: string; image: string }> = {
  coding: {
    description:
      "Hello world! I am a web app and mobile developer sharing my development journeys with my audience.",
    image: "/coding.jpg",
  },
  gaming: {
    description: "Chill variety video game streamer and content creator",
    image: "/gaming.jpg",
  },
};

const SETS: SetDefinition[] = [
  {
    id: "gaming",
    slug: "gaming",
    title: "gaming",
    ...SET_METADATA.gaming,
  },
  {
    id: "coding",
    slug: "coding",
    title: "coding",
    ...SET_METADATA.coding,
  },
];

// Convert an account input to a SocialCardData object
function toSocialCard(account: AccountInput, setSlug: string, index: number): SocialCardData {
  const config = getPlatformConfig(account.platform);
  return {
    id: `${setSlug}-${account.platform}-${index}`,
    platform: account.platform,
    username: account.username,
    profileUrl: config.profileUrl(account.username),
    followersCount: null,
    ctaLabel: config.ctaLabel,
  };
}

// Get all sets with their cards
export function getAllSetsWithCards(): SetWithCards[] {
  return SETS.map((set) => {
    const accounts = set.slug === "coding" ? CODING_ACCOUNTS : GAMING_ACCOUNTS;
    return {
      set: { id: set.id, slug: set.slug, title: set.title },
      cards: accounts.map((account, index) => toSocialCard(account, set.slug, index)),
    };
  });
}

// Get cards for a specific set
export function getCardsForSet(slug: string): SocialCardData[] {
  const accounts = slug === "coding" ? CODING_ACCOUNTS : slug === "gaming" ? GAMING_ACCOUNTS : [];
  return accounts.map((account, index) => toSocialCard(account, slug, index));
}

// Check if a set exists
export function isValidSet(slug: string): boolean {
  return SETS.some((set) => set.slug === slug);
}

// Get all valid set slugs
export function getValidSetSlugs(): string[] {
  return SETS.map((set) => set.slug);
}
