import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility used by the 3D keyboard animations for sequencing.
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
