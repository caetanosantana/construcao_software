import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function copyWith<T extends object>(toCopy: T, withThis: Partial<T>): T {
  return Object.assign({}, toCopy, withThis);
}

export function fileReadAsync(file: File): Promise<FileReader> {
  const reader = (file: File) =>
    new Promise<FileReader>((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(fr);
      fr.onerror = (err) => reject(err);
      fr.readAsDataURL(file);
    });

  return reader(file);
}
