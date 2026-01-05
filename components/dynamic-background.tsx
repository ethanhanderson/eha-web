"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

export function DynamicBackground() {
  const pathname = usePathname()

  useEffect(() => {
    const isHomePage = pathname === "/"
    const elements = [document.documentElement, document.body]

    if (isHomePage) {
      elements.forEach((el) => el.classList.add("bg-neutral-50"))
    } else {
      elements.forEach((el) => el.classList.remove("bg-neutral-50"))
    }
  }, [pathname])

  return null
}
