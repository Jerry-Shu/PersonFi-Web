import type { ClothingItem, OutfitRecommendation } from "../types/models";

export const mockItems: ClothingItem[] = [
    { id: crypto.randomUUID(), name: "Basic Tee", category: "top", colorHex: "#222222", createdAt: new Date().toISOString() },
    { id: crypto.randomUUID(), name: "Chino Pants", category: "bottom", colorHex: "#9CA3AF", createdAt: new Date().toISOString() },
    { id: crypto.randomUUID(), name: "Sneakers", category: "shoes", colorHex: "#0A84FF", createdAt: new Date().toISOString() },
    { id: crypto.randomUUID(), name: "Denim Jacket", category: "outerwear", colorHex: "#2563EB", createdAt: new Date().toISOString() },
];

export const mockRecs = (items: ClothingItem[]): OutfitRecommendation[] => {
    const get = (c: ClothingItem["category"]) => items.find(i => i.category === c);
    const a = [get("top"), get("bottom"), get("shoes")].filter(Boolean) as ClothingItem[];
    const b = [get("top"), get("bottom"), get("shoes"), get("outerwear")].filter(Boolean) as ClothingItem[];

    return [
        { id: crypto.randomUUID(), title: "Everyday Combo", items: a, rationale: "Balanced top/bottom/shoes with neutral contrast." },
        { id: crypto.randomUUID(), title: "Chill Layers", items: b, rationale: "Add the jacket for cooler evenings." },
    ];
};
