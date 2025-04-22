import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function for combining Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
};

export type Vocabulary = {
  id: number;
  word: string;
  article: "Der" | "Die" | "Das";
  translation: string;
  level: "A1" | "A2" | "B1" | "B2" | string; 
};