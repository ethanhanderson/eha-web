"use client";

import { Badge } from "@/components/ui/badge";
import type { SocialCardData } from "@/lib/social/types";
import { cn, withBasePath } from "@/lib/utils";
import { Code, Gamepad2, type LucideIcon } from "lucide-react";
import {
  AnimatePresence,
  motion,
  stagger,
  useReducedMotion,
} from "motion/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { SocialCard } from "./SocialCard";

interface SetWithCards {
  set: { id: string; slug: string; title: string };
  cards: SocialCardData[];
}

interface SetViewProps {
  initialSets: SetWithCards[];
  setMetadata: Record<string, { description: string; image: string }>;
}

const ICONS: Record<string, LucideIcon> = {
  coding: Code,
  gaming: Gamepad2,
};

const SET_THEME: Record<
  string,
  { shadow: string; indicator: string; badge: string }
> = {
  coding: {
    shadow: "shadow-orange-500/20 dark:shadow-orange-500/10",
    indicator: "bg-orange-500 dark:bg-orange-600",
    badge:
      "bg-orange-500/10 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300 hover:bg-orange-500/20",
  },
  gaming: {
    shadow: "shadow-blue-500/20 dark:shadow-blue-500/10",
    indicator: "bg-blue-500 dark:bg-blue-600",
    badge:
      "bg-blue-500/10 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 hover:bg-blue-500/20",
  },
};

export function SetView({ initialSets, setMetadata }: SetViewProps) {
  const router = useRouter();
  const params = useParams<{ set?: string | string[] }>();
  const shouldReduceMotion = useReducedMotion();

  const routeSlug = useMemo(() => {
    const raw = params?.set;
    if (typeof raw === "string") return raw;
    if (Array.isArray(raw)) return raw[0];
    return undefined;
  }, [params]);

  const resolvedSlug = routeSlug ?? initialSets[0]?.set.slug;

  const activeSet = useMemo(() => {
    if (!resolvedSlug) return initialSets[0];
    return (
      initialSets.find((s) => s.set.slug === resolvedSlug) || initialSets[0]
    );
  }, [initialSets, resolvedSlug]);

  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      // Barely move, mostly blur
      x: shouldReduceMotion ? 0 : direction > 0 ? 8 : -8,
      scale: shouldReduceMotion ? 1 : 0.995,
      opacity: 0,
      filter: "blur(4px)",
    }),
    center: {
      zIndex: 1,
      x: 0,
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: shouldReduceMotion ? 0 : direction < 0 ? 8 : -8,
      scale: shouldReduceMotion ? 1 : 0.995,
      opacity: 0,
      filter: "blur(4px)",
    }),
  };

  const cardsContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        delayChildren: stagger(0.05),
      },
    },
  };

  const cardItem = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 14, filter: "blur(6px)" },
    visible: shouldReduceMotion
      ? { opacity: 1, transition: { duration: 0.16 } }
      : {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
        },
  };

  // To determine direction, we need to know the index of current vs new.
  const activeIndex = useMemo(() => {
    if (!activeSet) return 0;
    return initialSets.findIndex((s) => s.set.id === activeSet.set.id);
  }, [activeSet, initialSets]);

  const [direction, setDirection] = useState(0);
  const prevIndexRef = useRef<number | null>(null);

  // Track direction changes when activeIndex changes (for URL navigation)
  useEffect(() => {
    const prev = prevIndexRef.current;
    if (prev !== null && prev !== activeIndex) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- needed for animation direction on URL nav
      setDirection(activeIndex > prev ? 1 : -1);
    }
    prevIndexRef.current = activeIndex;
  }, [activeIndex]);

  const handleSetChange = (setSlug: string) => {
    const newIndex = initialSets.findIndex((s) => s.set.slug === setSlug);
    if (newIndex !== -1 && newIndex !== activeIndex) {
      setDirection(newIndex > activeIndex ? 1 : -1);
    }

    router.push(`/links/${setSlug}`, { scroll: false });
  };

  if (!activeSet) return null;

  const metadata = setMetadata[activeSet.set.slug] || {
    description: "",
    image: withBasePath("/file.svg"),
  };

  const SetIcon = ICONS[activeSet.set.slug] || Code;
  const theme = SET_THEME[activeSet.set.slug] || {
    shadow: "shadow-primary/25",
    indicator: "bg-primary",
    badge: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  };

  return (
    <div className="relative flex min-h-[calc(100vh-8rem)] flex-col justify-center pb-24">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.section
          key={activeSet.set.slug}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { duration: 0.12, ease: "easeInOut" },
            scale: { duration: 0.12, ease: "easeInOut" },
            opacity: { duration: 0.12, ease: "easeInOut" },
            filter: { duration: 0.12, ease: "easeInOut" },
          }}
          className="flex w-full flex-col items-start gap-8 md:flex-row md:gap-48"
        >
          {/* Header */}
          <div className="flex w-full shrink-0 flex-col items-center gap-6 text-center md:w-96 md:items-start md:text-left">
            <div
              className={cn(
                "relative h-32 w-32 shrink-0 overflow-hidden rounded-full shadow-xl transition-shadow duration-300",
                theme.shadow
              )}
            >
              <Image
                src={metadata.image}
                alt={activeSet.set.title}
                fill
                sizes="128px"
                className="object-cover"
                priority
              />
            </div>

            <div className="flex flex-col items-center gap-2 md:items-start">
              <Badge
                variant="secondary"
                className={cn(
                  "gap-1 capitalize transition-colors",
                  theme.badge
                )}
              >
                <SetIcon className="h-3 w-3" />
                {activeSet.set.title}
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Ethan Anderson
              </h1>
              <p className="max-w-full text-muted-foreground">
                {metadata.description}
              </p>
            </div>
          </div>

          {/* Cards grid */}
          <div className="flex-1 w-full">
            {activeSet.cards.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border p-8 text-center">
                <p className="text-muted-foreground">
                  No enabled accounts in this set.
                </p>
              </div>
            ) : (
              <motion.div
                variants={cardsContainer}
                initial="hidden"
                animate="visible"
                className="grid gap-6 sm:grid-cols-2"
              >
                {activeSet.cards.map((card) => (
                  <motion.div key={card.id} variants={cardItem}>
                    <SocialCard card={card} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </motion.section>
      </AnimatePresence>

      {/* Floating Picker */}
      <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2">
        <div className="flex items-center gap-1 rounded-full border bg-background/80 p-1.5 shadow-lg backdrop-blur-md">
          {initialSets.map((s) => {
            const isSelected = s.set.slug === activeSet.set.slug;
            const Icon = ICONS[s.set.slug] || Code;
            const setColors = SET_THEME[s.set.slug] || {
              indicator: "bg-primary",
              shadow: "shadow-primary/25",
              badge: "bg-secondary",
            };

            return (
              <button
                key={s.set.id}
                onClick={() => handleSetChange(s.set.slug)}
                className={cn(
                  "relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isSelected
                    ? "text-white"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeSetBubble"
                    className={cn(
                      "absolute inset-0 rounded-full",
                      setColors.indicator
                    )}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span className="capitalize">
                    {s.set.title.replace("eha ", "")}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
