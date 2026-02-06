import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function sortSizes(sizes: string[] | undefined | null): string[] {
    if (!sizes || !Array.isArray(sizes)) return [];

    const sizeOrder = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL", "XXXXL"];

    return [...sizes].sort((a, b) => {
        if (typeof a !== 'string' || typeof b !== 'string') return 0;
        const isANumeric = !isNaN(Number(a));
        const isBNumeric = !isNaN(Number(b));

        if (isANumeric && isBNumeric) {
            return Number(a) - Number(b);
        }

        const aIndex = sizeOrder.indexOf(a.toUpperCase());
        const bIndex = sizeOrder.indexOf(b.toUpperCase());

        if (aIndex !== -1 && bIndex !== -1) {
            return aIndex - bIndex;
        }

        // Fallback to alphabetical if one is numeric and other is not, or neither in sizeOrder
        return a.localeCompare(b);
    });
}
