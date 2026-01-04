import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidSet, getValidSetSlugs } from "@/lib/data/accounts";
import { withBasePath } from "@/lib/utils";

interface PageProps {
  params: Promise<{ set: string }>;
}

export function generateStaticParams() {
  return getValidSetSlugs().map((set) => ({ set }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { set } = await params;
  const setIcon =
    set === "coding"
      ? withBasePath("/coding.jpg")
      : set === "gaming"
        ? withBasePath("/gaming.jpg")
        : undefined;

  if (!setIcon) {
    return {};
  }

  return {
    icons: {
      icon: setIcon,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { set } = await params;

  // Validate that the set slug exists
  if (!isValidSet(set)) {
    notFound();
  }

  // Layout renders the UI, this page just validates the route
  return null;
}
