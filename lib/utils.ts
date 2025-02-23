import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatDate = (
  dateString: string,
  options?: Intl.DateTimeFormatOptions
) => {
  const { format } = new Intl.DateTimeFormat("en-GB", options);
  return format(new Date(dateString));
};

export const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
