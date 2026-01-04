"use client";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
  Code,
  Cpu,
  Database,
  Gamepad2,
  Layout,
  MapPin,
  Monitor,
  MousePointerClick,
  Palette,
  Radio,
  Server,
  Terminal,
  Video,
  Zap,
} from "lucide-react";
import { motion, stagger, useReducedMotion } from "motion/react";
import Image from "next/image";

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();

  const mapCenter: [number, number] = [-112.074, 33.4484];
  const mapZoom = 10;
  const mapPitch = 50;
  const mapBearing = 28;
  // Use a static-image–compatible style so the static preview matches the live map.
  const mapStyle = "mapbox://styles/mapbox/streets-v12";
  const mapToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  const staticMapUrl = (() => {
    if (!mapToken) return undefined;

    // Mapbox static images API expects /styles/v1/{username}/{style_id}
    const stylePath = mapStyle.startsWith("mapbox://styles/")
      ? mapStyle.replace("mapbox://styles/", "")
      : mapStyle.replace(/^https?:\/\/api\.mapbox\.com\/styles\/v1\//, "");

    const marker = `pin-s+22c55e(${mapCenter[0]},${mapCenter[1]})`;
    const viewport = `${mapCenter[0]},${mapCenter[1]},${mapZoom},${mapBearing},${mapPitch}`;
    const imageSize = "320x210@2x";
    const params = new URLSearchParams({
      access_token: mapToken,
      logo: "false",
      attribution: "false",
    });

    return `https://api.mapbox.com/styles/v1/${stylePath}/static/${marker}/${viewport}/${imageSize}?${params.toString()}`;
  })();

  const codingTechnologies = [
    {
      title: "Front End Frameworks & Tools",
      items: [
        { label: "Next.js", icon: "/coding-technologies/nextjs.svg" },
        { label: "Vue.js", icon: "/coding-technologies/vue.svg" },
        { label: "React", icon: "/coding-technologies/react.svg" },
        { label: "shadcn/ui", icon: "/coding-technologies/shadcn-ui.svg" },
        { label: "Tailwind CSS", icon: "/coding-technologies/tailwindcss.svg" },
        { label: "Vercel", icon: "/coding-technologies/vercel.svg" },
        { label: "Cursor", icon: "/coding-technologies/cursor.svg" },
      ],
    },
    {
      title: "Backend Frameworks & Tools",
      items: [
        { label: "Node.js", icon: "/coding-technologies/nodejs.svg" },
        { label: "Express.js", icon: "/coding-technologies/expressjs.svg" },
        { label: "Supabase", icon: "/coding-technologies/supabase.svg" },
        { label: "PostgreSQL", icon: "/coding-technologies/postgresql.svg" },
        { label: "MongoDB", icon: "/coding-technologies/mongodb.svg" },
        { label: "Postman", icon: "/coding-technologies/postman.svg" },
        { label: "Better Auth", icon: "/coding-technologies/better-auth.svg" },
      ],
    },
    {
      title: "Mobile App Languages & Tools",
      items: [
        { label: "Swift", icon: "/coding-technologies/swift.svg" },
        { label: "SwiftUI", icon: "/coding-technologies/swiftui.svg" },
        { label: "Xcode", icon: "/coding-technologies/xcode.svg" },
        { label: "Expo", icon: "/coding-technologies/expo.svg" },
        {
          label: "React Native",
          icon: "/coding-technologies/react-native.svg",
        },
      ],
    },
  ];

  const codingSkills = [
    { label: "Front end", icon: Monitor },
    { label: "Back end", icon: Server },
    { label: "Relational databases", icon: Database },
    { label: "Application design", icon: Layout },
    { label: "UI design", icon: Palette },
    { label: "UX design", icon: MousePointerClick },
  ];

  const interests = [
    { label: "Coding", icon: Code, color: "bg-blue-500" },
    { label: "Technology", icon: Cpu, color: "bg-cyan-500" },
    { label: "Watching movies & TV", icon: Monitor, color: "bg-indigo-500" },
    { label: "Gaming", icon: Gamepad2, color: "bg-purple-500" },
    { label: "Content creation", icon: Video, color: "bg-pink-500" },
    { label: "Streaming", icon: Radio, color: "bg-red-500" },
  ];

  const cardsContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        delayChildren: stagger(0.06),
      },
    },
  };

  const cardItem = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 10, filter: "blur(6px)" },
    visible: shouldReduceMotion
      ? { opacity: 1, transition: { duration: 0.16 } }
      : {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
        },
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4 md:p-8">
      <motion.div
        variants={cardsContainer}
        initial="hidden"
        animate="visible"
        className="flex flex-col xl:flex-row gap-4 md:gap-8 items-center xl:items-start"
      >
        <motion.div
          variants={cardItem}
          className="w-full max-w-sm md:aspect-[3/3.5] xl:w-96 xl:aspect-3/4"
          style={{ willChange: "transform, filter, opacity" }}
        >
          <Card className="rounded-4xl border-0 ring-0 bg-white h-full flex flex-col justify-between gap-12 md:gap-0 p-8">
            <div className="flex flex-col items-start gap-3">
              <div className="relative size-16 overflow-hidden rounded-full">
                <Image
                  src="/profile.jpg"
                  alt="Ethan Anderson"
                  fill
                  className="object-cover"
                />
              </div>
              <CardTitle className="text-3xl font-bold text-black text-left">
                Ethan Anderson
              </CardTitle>
            </div>
            <CardDescription className="text-2xl font-semibold text-neutral-400">
              <ul className="flex flex-col gap-4 list-none">
                <li className="flex flex-col-reverse items-start gap-1 md:flex-row md:items-center md:gap-3">
                  <span>Software engineer</span>
                  <div className="size-8 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                    <Code className="size-4 text-white" />
                  </div>
                </li>
                <li className="flex flex-col-reverse items-start gap-1 md:flex-row md:items-center md:gap-3">
                  <span>Tech enthusiast</span>
                  <div className="size-8 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
                    <Zap className="size-4 text-white" />
                  </div>
                </li>
                <li className="flex flex-col-reverse items-start gap-1 md:flex-row md:items-center md:gap-3">
                  <span>Content creator</span>
                  <div className="size-8 rounded-full bg-pink-500 flex items-center justify-center shrink-0">
                    <Video className="size-4 text-white" />
                  </div>
                </li>
              </ul>
            </CardDescription>
          </Card>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start w-full md:w-auto">
          <div className="flex flex-col gap-6 w-full md:w-auto">
            <motion.div
              variants={cardItem}
              className="w-full max-w-sm md:w-84"
              style={{ willChange: "transform, filter, opacity" }}
            >
              <Card className="rounded-4xl border-0 ring-0 bg-white flex flex-col gap-6 p-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="size-6 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                      <MapPin className="size-3 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-black">
                      Location
                    </CardTitle>
                  </div>
                </div>
                {/* Live map (Mapbox GL) - temporarily disabled */}
                {/*
                  <div className="h-48 w-full">
                    <Map
                      center={mapCenter}
                      zoom={mapZoom}
                      styleUrl={mapStyle}
                      markerColor="#22c55e"
                      enable3d
                      pitch={mapPitch}
                      bearing={mapBearing}
                      interactive={false}
                    />
                  </div>
                */}

                <div className="h-48 w-full overflow-hidden rounded-lg bg-neutral-100 flex items-center justify-center">
                  {staticMapUrl ? (
                    <img
                      src={staticMapUrl}
                      alt="Map preview"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-xs text-neutral-500 text-center px-4">
                      Add NEXT_PUBLIC_MAPBOX_TOKEN to load the map.
                    </span>
                  )}
                </div>
              </Card>
            </motion.div>

            <motion.div
              variants={cardItem}
              className="w-full max-w-sm md:w-84"
              style={{ willChange: "transform, filter, opacity" }}
            >
              <Card className="rounded-4xl border-0 ring-0 bg-white flex flex-col gap-6 p-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="size-6 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                      <Zap className="size-3 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-black">
                      Interests
                    </CardTitle>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {interests.map((interest) => (
                    <div
                      key={interest.label}
                      className="bg-neutral-50 border-0 shadow-none rounded-full p-0 flex flex-row items-center w-full h-10 overflow-hidden gap-3"
                    >
                      <div
                        className={`size-10 rounded-full ${interest.color} flex items-center justify-center shrink-0`}
                      >
                        <interest.icon className="size-5 text-white" />
                      </div>
                      <span className="text-sm font-medium text-neutral-600 ml-auto pr-4 text-right">
                        {interest.label}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          <div className="flex flex-col gap-6 w-full md:w-auto">
            <motion.div
              variants={cardItem}
              className="w-full max-w-sm md:w-96"
              style={{ willChange: "transform, filter, opacity" }}
            >
              <Card className="rounded-4xl border-0 ring-0 bg-white flex flex-col gap-6 p-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="size-6 rounded-full bg-purple-500 flex items-center justify-center shrink-0">
                      <Terminal className="size-3 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-black">
                      Coding Skills
                    </CardTitle>
                  </div>
                  <div className="bg-neutral-50 border-0 shadow-none rounded-xl p-4 flex flex-col gap-2">
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm leading-relaxed font-medium text-neutral-400">
                      {codingSkills.map((item) => (
                        <span
                          key={item.label}
                          className="inline-flex items-center gap-2"
                        >
                          <item.icon className="size-4" />
                          <span>{item.label}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              variants={cardItem}
              className="w-full max-w-sm md:w-96"
              style={{ willChange: "transform, filter, opacity" }}
            >
              <Card className="rounded-4xl border-0 ring-0 bg-white flex flex-col gap-3 p-6 h-fit">
                <div className="flex items-center gap-3">
                  <div className="size-6 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                    <Cpu className="size-3 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-black">
                    Coding Technologies
                  </CardTitle>
                </div>

                <div className="flex flex-col gap-4">
                  {codingTechnologies.map((section) => (
                    <div
                      key={section.title}
                      className="bg-neutral-50 border-0 shadow-none rounded-xl p-4 flex flex-col gap-2"
                    >
                      <h3 className="font-semibold text-sm text-neutral-900">
                        {section.title}
                      </h3>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm leading-relaxed font-medium text-neutral-400">
                        {section.items.map((item) => (
                          <span
                            key={item.label}
                            className="inline-flex items-center gap-2"
                          >
                            <Image
                              src={item.icon}
                              alt={item.label}
                              width={16}
                              height={16}
                              className="size-4"
                            />
                            <span>{item.label}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
