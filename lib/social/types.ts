import type { Platform } from "./platform-types"

// Minimal card data for rendering
export interface SocialCardData {
  id: string
  platform: Platform
  username: string
  profileUrl: string
  followersCount: number | null
  ctaLabel: string
}
