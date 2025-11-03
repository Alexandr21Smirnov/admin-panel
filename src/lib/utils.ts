import { SortField, SortDirection } from "@/types/table";
import { User } from "@/types/user";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSortValue = (user: User, field: SortField): string | number => {
  const sortValueMap: Record<SortField, string | number> = {
    id: user.id,
    firstName: `${user.firstName} ${user.lastName}`,
    email: user.email,
    birthDate: new Date(user.birthDate).getTime(),
    weight: user.weight,
    height: user.height,
  };
  return sortValueMap[field];
};

export const compareValues = (a: string | number, b: string | number, direction: SortDirection): number => {
  if (a < b) return direction === 'asc' ? -1 : 1;
  if (a > b) return direction === 'asc' ? 1 : -1;
  return 0;
};

export const getBirthYear = (birthDate: string): number => new Date(birthDate).getFullYear();

export const getPaginationRange = (currentPage: number, totalPages: number): number[] => {
  const maxVisible = 5;

  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return Array.from({ length: maxVisible }, (_, i) => i + 1);
  }

  if (currentPage >= totalPages - 2) {
    return Array.from({ length: maxVisible }, (_, i) => totalPages - maxVisible + i + 1);
  }

  return Array.from({ length: maxVisible }, (_, i) => currentPage - 2 + i);
};
