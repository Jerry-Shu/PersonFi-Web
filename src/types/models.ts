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
