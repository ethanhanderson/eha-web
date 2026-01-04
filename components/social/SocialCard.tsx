"use client";

import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCount, getPlatformConfig } from "@/lib/social/platforms";
import { PLATFORMS } from "@/lib/social/platform-types";
import type { SocialCardData } from "@/lib/social/types";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface SocialCardProps {
  card: SocialCardData;
  className?: string;
}

export function SocialCard({ card, className }: SocialCardProps) {
  const config = getPlatformConfig(card.platform);

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-shadow",
        className
      )}
      style={
        {
          "--platform-color": config.brandColor,
          "--platform-color-light": config.brandColorLight,
        } as React.CSSProperties
      }
    >
      {/* Background tint */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{ backgroundColor: config.brandColor }}
      />

      <CardHeader className="pb-3 relative">
        <div className="flex items-center gap-3">
          {/* Platform logo */}
          {card.platform !== PLATFORMS.INSTAGRAM && (
            <div
              className="relative flex h-10 w-10 items-center justify-center overflow-hidden p-2"
              style={{
                backgroundColor: config.brandColorLight,
                clipPath: "path('M20,40c8.76,0,13.64,0,16.81-3.19C40,33.64,40,28.76,40,20s0-13.64-3.19-16.81C33.64,0,28.76,0,20,0S6.36,0,3.19,3.19C0,6.36,0,11.24,0,20s0,13.64,3.19,16.81C6.36,40,11.24,40,20,40z')",
              }}
            >
              <Image
                src={config.logo}
                alt={config.name}
                width={24}
                height={24}
                className="h-6 w-6"
                style={{ color: config.brandColor }}
              />
            </div>
          )}
          {card.platform === PLATFORMS.INSTAGRAM && (
            <div
              className="flex h-10 w-10 items-center justify-center"
              style={{
                clipPath: "path('M20,40c8.76,0,13.64,0,16.81-3.19C40,33.64,40,28.76,40,20s0-13.64-3.19-16.81C33.64,0,28.76,0,20,0S6.36,0,3.19,3.19C0,6.36,0,11.24,0,20s0,13.64,3.19,16.81C6.36,40,11.24,40,20,40z')",
              }}
            >
              <Image
                src={config.logo}
                alt={config.name}
                width={40}
                height={40}
                className="h-10 w-10"
                style={{ color: config.brandColor }}
              />
            </div>
          )}

          {/* Username and platform */}
          <div className="min-w-0 flex-1">
            <CardTitle className="flex items-center gap-2 truncate">
              <span className="truncate">
                My {card.platform === PLATFORMS.X ? "Twitter (X)" : config.name}
              </span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              @{card.username}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardFooter className="mt-auto pt-4 relative">
        <a
          href={card.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "group flex h-9 w-full items-center justify-center gap-2 px-3 text-sm font-medium text-white transition-all hover:opacity-90",
            config.buttonClassName || "rounded-lg"
          )}
          style={{
            backgroundColor: config.buttonColor || config.brandColor,
          }}
        >
          <span>{card.ctaLabel}</span>
          {card.followersCount !== null && card.followersCount !== undefined && (
            <div className="relative flex items-center justify-center">
              <span
                className={cn(
                  "font-normal transition-all duration-300 group-hover:opacity-0 group-hover:blur-[2px] group-hover:scale-50",
                  config.name === "Kick" ? "text-black/70" : "text-white/70"
                )}
              >
                {formatCount(card.followersCount)}
              </span>
              <ArrowRight
                className={cn(
                  "absolute transition-all duration-300 opacity-0 blur-[2px] scale-50 group-hover:opacity-100 group-hover:blur-none group-hover:scale-100",
                  config.name === "Kick" ? "text-black/70" : "text-white/70"
                )}
                size={16}
              />
            </div>
          )}
          {(card.followersCount === null || card.followersCount === undefined) && (
            <ArrowRight
              className={cn(
                "transition-all duration-300",
                config.name === "Kick" ? "text-black/70" : "text-white/70"
              )}
              size={16}
            />
          )}
        </a>
      </CardFooter>
    </Card>
  );
}
