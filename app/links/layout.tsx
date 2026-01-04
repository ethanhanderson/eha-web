import type { Metadata } from "next";
import { SetView } from "@/components/social";
import { getAllSetsWithCards, SET_METADATA } from "@/lib/data/accounts";

export const metadata: Metadata = {
  title: "Social Links | eha",
  description:
    "Find eha across Twitch, YouTube, Kick, Instagram, X, and TikTok",
};

export default function LinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const setsWithCards = getAllSetsWithCards();

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-4 py-8">
        <SetView initialSets={setsWithCards} setMetadata={SET_METADATA} />
        {children}
      </main>
    </div>
  );
}
