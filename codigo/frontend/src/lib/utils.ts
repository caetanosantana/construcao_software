import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function copyWith<T extends object>(toCopy: T, withThis: Partial<T>): T {
  return Object.assign({}, toCopy, withThis);
}
