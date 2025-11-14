export type Category = "top" | "bottom" | "shoes" | "outerwear" | "accessory";

export interface ClothingItem {
    id: string;
    name: string;
    category: Category;
    colorHex: string;
    imageURL?: string;
    productURL?: string;
    createdAt: string; // ISO
}

export interface OutfitRecommendation {
    id: string;
    title: string;
    items: ClothingItem[];
    rationale: string;
    occasion?: string;
}

// Onboarding preferences captured during first-time setup
export interface OnboardingPrefs {
    styleIcon?: string; // e.g. Zendaya
    favoriteColors: string[]; // simple color names
    aesthetics: string[]; // e.g. Minimalist, Streetwear
    wardrobePhotos: string[]; // object URLs for local previews
}
