import { hexToRgba } from "../lib/color";
import TagChip from "./TagChip";
import type { OutfitRecommendation } from "../types/models";
import { Heart, Share2, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function OutfitCard({ rec }: { rec: OutfitRecommendation }) {
    const [liked, setLiked] = useState(false);
    const colors = rec.items.map(i => i.colorHex);
    const g1 = hexToRgba(colors[0] ?? "#3b82f6", 0.85);
    const g2 = hexToRgba(colors[1] ?? "#a855f7", 0.85);

    return (
        <div
            className="rounded-3xl p-5 sm:p-6 text-white shadow-lg border"
            style={{
                background: `linear-gradient(135deg, ${g1} 0%, ${g2} 100%)`,
                borderColor: "rgba(255,255,255,0.2)",
            }}
        >
            <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-bold drop-shadow">{rec.title}</h3>
                <button
                    onClick={() => setLiked(v => !v)}
                    className="bg-white/20 rounded-full p-2 hover:bg-white/30 transition"
                    aria-pressed={liked}
                >
                    <Heart size={18} className={liked ? "fill-white" : ""} />
                </button>
            </div>

            <div className="mt-3 space-y-2">
                {rec.items.map(it => (
                    <div key={it.id} className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded border" style={{ background: it.colorHex }} />
                        <div className="font-semibold">{it.name}</div>
                        <TagChip text={it.category[0].toUpperCase() + it.category.slice(1)} />
                    </div>
                ))}
            </div>

            <p className="mt-4 text-sm bg-black/20 rounded-xl p-3">{rec.rationale}</p>

            <div className="mt-5 flex items-center gap-3">
                <button className="px-3 py-2 rounded-full bg-white/20 hover:bg-white/30 text-sm flex items-center gap-2">
                    <Share2 size={16} /> Share
                </button>
                <button className="px-3 py-2 rounded-full bg-white/30 hover:bg-white/40 text-sm flex items-center gap-2">
                    <CheckCircle2 size={16} /> Wear Today
                </button>
            </div>
        </div>
    );
}
