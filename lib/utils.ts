import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  dateString: string,
  options?: Intl.DateTimeFormatOptions
) {
  const { format } = new Intl.DateTimeFormat("en-GB", options);
  return format(new Date(dateString));
}
