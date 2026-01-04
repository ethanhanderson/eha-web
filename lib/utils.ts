import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate a random string ID (similar to nanoid)
 * Uses crypto for secure random generation
 */
export function nanoid(size = 21): string {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const randomBytes = new Uint8Array(size)
  crypto.getRandomValues(randomBytes)
  return Array.from(randomBytes, (byte) => alphabet[byte % alphabet.length]).join('')
}

/**
 * Prefix a relative path with the configured Next.js basePath so local assets
 * resolve in both development and production.
 *
 * See: https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath
 */
export function withBasePath(path: string) {
  if (path.startsWith("http")) return path;

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const normalizedBase = basePath.endsWith("/")
    ? basePath.slice(0, -1)
    : basePath;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${normalizedBase}${normalizedPath}`;
}
