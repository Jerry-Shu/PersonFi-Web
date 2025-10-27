import { useLocalStore } from "../hooks/useLocalStore";
import type { ClothingItem, OutfitRecommendation } from "../types/models";
import { mockItems } from "../data/mock";
import OutfitCard from "../components/OutfitCard";
import TagChip from "../components/TagChip";
import { useState } from "react";
import { recommendOutfit, parseOccasion } from "../lib/agent";

const CHIPS = ["Casual", "Office", "Date", "Party", "Travel"] as const;

export default function Match() {
    const [items] = useLocalStore<ClothingItem[]>("pf_items", mockItems);
    const [query, setQuery] = useState("Office");
    const [saved, setSaved] = useLocalStore<OutfitRecommendation[]>("pf_recs", []);

    function recommend() {
        if (items.length === 0) return;
        const rec = recommendOutfit(items, query);
        setSaved([rec, ...saved]);
    }

    function quick(chip: string) {
        setQuery(chip);
        const rec = recommendOutfit(items, chip);
        setSaved([rec, ...saved]);
    }

    return (
        <section className="space-y-5">
            <h1 className="text-2xl font-extrabold">Match</h1>

            <div className="flex flex-wrap gap-2">
                {CHIPS.map(chip => (
                    <button
                        key={chip}
                        onClick={() => quick(chip)}
                        className={`px-3 py-1 rounded-full text-sm font-semibold
            ${parseOccasion(query) === chip.toLowerCase() ? "bg-black text-white" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"}`}
                    >
                        {chip}
                    </button>
                ))}
            </div>

            <div className="grid sm:grid-cols-3 gap-3 items-end">
                <label className="sm:col-span-2">
                    <div className="text-sm font-medium">What are you doing?</div>
                    <input value={query} onChange={e => setQuery(e.target.value)}
                        placeholder="e.g. Work meeting, Date night, Travel"
                        className="mt-1 w-full rounded-lg border px-3 py-2" />
                </label>
                <button onClick={recommend} className="h-10 rounded-lg bg-black text-white font-semibold">
                    Recommend Outfit
                </button>
            </div>

            <div className="flex items-center gap-2">
                <TagChip text={`Items: ${items.length}`} />
                <TagChip text={`Occasion: ${query}`} />
                <button onClick={() => setSaved([])} className="text-sm text-zinc-500 hover:underline">Clear Saved</button>
            </div>

            {saved.length === 0 ? (
                <div className="text-zinc-500 text-center py-12">Ask for a recommendation to see results.</div>
            ) : (
                <div className="grid gap-4">
                    {saved.map(r => <OutfitCard key={r.id} rec={r} />)}
                </div>
            )}
        </section>
    );
}
