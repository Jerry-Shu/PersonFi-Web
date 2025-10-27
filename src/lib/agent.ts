import type { ClothingItem, OutfitRecommendation, Category } from "../types/models";
import { hexToHsl } from "./color";

// Very small, local "AI" agent:
// - Parses a free-text query for an occasion
// - Picks 3-4 items (top, bottom, shoes, optional outerwear)
// - Uses simple color/formality heuristics

export function parseOccasion(query: string): string {
    const q = query.toLowerCase();
    if (/work|office|meeting|interview/.test(q)) return "office";
    if (/date|dinner/.test(q)) return "date";
    if (/party|club|celebration/.test(q)) return "party";
    if (/travel|trip|airport/.test(q)) return "travel";
    if (/gym|workout/.test(q)) return "gym";
    return "casual";
}

function pickOne(items: ClothingItem[], category: Category, score: (i: ClothingItem) => number) {
    const candidates = items.filter(i => i.category === category);
    return candidates.sort((a, b) => score(b) - score(a))[0];
}

function neutralityScore(hex: string) {
    const { s, l } = hexToHsl(hex);
    // Low saturation and mid lightness -> more neutral/formal
    const neutralS = 1 - s; // prefer lower saturation
    const midL = 1 - Math.abs(l - 0.55) * 2; // prefer around 55% lightness
    return neutralS * 0.7 + Math.max(0, midL) * 0.3;
}

function popScore(hex: string) {
    const { s, l } = hexToHsl(hex);
    // Higher saturation and medium lightness -> more "party/date" pop
    const vivid = s;
    const goodL = 1 - Math.abs(l - 0.5) * 2;
    return vivid * 0.7 + Math.max(0, goodL) * 0.3;
}

export function recommendOutfit(items: ClothingItem[], query: string): OutfitRecommendation {
    const occ = parseOccasion(query);

    const formal = occ === "office" || occ === "interview";
    const colorful = occ === "party" || occ === "date";
    const comfy = occ === "travel" || occ === "casual";

    const top = pickOne(items, "top", i => (formal ? neutralityScore(i.colorHex) : colorful ? popScore(i.colorHex) : 0.5));
    const bottom = pickOne(items, "bottom", i => (formal ? neutralityScore(i.colorHex) : colorful ? popScore(i.colorHex) : 0.5));
    const shoes = pickOne(items, "shoes", i => (comfy ? neutralityScore(i.colorHex) + 0.2 : neutralityScore(i.colorHex)));
    const outer = pickOne(items, "outerwear", i => (formal ? neutralityScore(i.colorHex) : colorful ? popScore(i.colorHex) : neutralityScore(i.colorHex)));

    const chosen = [top, bottom, shoes, outer].filter(Boolean) as ClothingItem[];

    const title =
        occ === "office" ? "Office Ready" :
            occ === "date" ? "Date Night" :
                occ === "party" ? "Party Fit" :
                    occ === "travel" ? "Travel Easy" :
                        "Casual Combo";

    const why: string[] = [];
    if (formal) why.push("Neutral tones for a polished look");
    if (colorful) why.push("More color pop for a lively vibe");
    if (comfy) why.push("Comfort-forward pieces for movement");
    if (outer) why.push("Layering piece in case it gets chilly");

    return {
        id: crypto.randomUUID(),
        title,
        items: chosen,
        rationale: why.join(". ") || "Balanced selection from your wardrobe.",
        occasion: query.trim() || occ,
    };
}
