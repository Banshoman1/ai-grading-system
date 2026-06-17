import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function gradeFromPercentage(pct: number): string {
  if (pct >= 70) return "A"
  if (pct >= 60) return "B"
  if (pct >= 50) return "C"
  if (pct >= 45) return "D"
  if (pct >= 40) return "E"
  return "F"
}

export function gradePoint(grade: string): number {
  switch (grade) {
    case "A":
      return 5
    case "B":
      return 4
    case "C":
      return 3
    case "D":
      return 2
    case "E":
      return 1
    default:
      return 0
  }
}
