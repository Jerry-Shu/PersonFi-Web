import { useEffect, useMemo, useRef, useState } from "react";
import shirt1 from "../assets/shirt1.png";
import shirt2 from "../assets/shirt2.png";
import shirt3 from "../assets/shirt3.png";
import shirt4 from "../assets/shirt4.png";
import pants1 from "../assets/pants1.png";
import pants2 from "../assets/pants2.png";
import shoe1 from "../assets/shoe1.png";
import shoe2 from "../assets/shoe2.png";

type Category = "All" | "Tops" | "Bottoms" | "Shoes";

type WardrobeItem = {
    id: string;
    src: string;
    category: Exclude<Category, "All">;
};

const SHIRTS: WardrobeItem[] = [shirt1, shirt2, shirt3, shirt4].map((src, i) => ({
    id: `shirt${i + 1}`,
    src,
    category: "Tops",
}));
const PANTS: WardrobeItem[] = [pants1, pants2].map((src, i) => ({
    id: `pants${i + 1}`,
    src,
    category: "Bottoms",
}));
const SHOES: WardrobeItem[] = [shoe1, shoe2].map((src, i) => ({
    id: `shoe${i + 1}`,
    src,
    category: "Shoes",
}));

const CATEGORIES: Category[] = ["All", "Tops", "Bottoms", "Shoes"];

function randomFrom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export default function Wardrobe() {
    const [cat, setCat] = useState<Category>("All");
    const [outfit, setOutfit] = useState<{ top: WardrobeItem; bottom: WardrobeItem; shoe: WardrobeItem }>(() => ({
        top: SHIRTS[0],
        bottom: PANTS[0],
        shoe: SHOES[0],
    }));

    // Row containers for centering selected items
    const topRowRef = useRef<HTMLDivElement | null>(null);
    const bottomRowRef = useRef<HTMLDivElement | null>(null);
    const shoeRowRef = useRef<HTMLDivElement | null>(null);
    // Item refs by id for precise centering
    const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

    const allByCategory = useMemo(
        () => ({ Tops: SHIRTS, Bottoms: PANTS, Shoes: SHOES } as const),
        []
    );

    const currentList: WardrobeItem[] = useMemo(() => {
        if (cat === "All") return [...SHIRTS, ...PANTS, ...SHOES];
        return allByCategory[cat];
    }, [cat, allByCategory]);

    const centerItemInRow = (row: HTMLDivElement | null, el: HTMLElement | null) => {
        if (!row || !el) return;
        const rowRect = row.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        const current = row.scrollLeft;
        const offsetWithinRow = elRect.left - rowRect.left + current;
        const target = offsetWithinRow - (row.clientWidth / 2 - el.clientWidth / 2);
        row.scrollTo({ left: target, behavior: "smooth" });
    };

    const onShuffle = () => {
        const next = { top: randomFrom(SHIRTS), bottom: randomFrom(PANTS), shoe: randomFrom(SHOES) };
        setOutfit(next);
        // ensure we are on All view so rows are visible
        setCat("All");
        // microtask to allow refs to exist before centering
        requestAnimationFrame(() => {
            centerItemInRow(topRowRef.current, itemRefs.current[next.top.id] ?? null);
            centerItemInRow(bottomRowRef.current, itemRefs.current[next.bottom.id] ?? null);
            centerItemInRow(shoeRowRef.current, itemRefs.current[next.shoe.id] ?? null);
        });
    };

    // Also center when user manually selects items
    useEffect(() => {
        requestAnimationFrame(() => {
            centerItemInRow(topRowRef.current, itemRefs.current[outfit.top.id] ?? null);
            centerItemInRow(bottomRowRef.current, itemRefs.current[outfit.bottom.id] ?? null);
            centerItemInRow(shoeRowRef.current, itemRefs.current[outfit.shoe.id] ?? null);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [outfit.top.id, outfit.bottom.id, outfit.shoe.id]);

    return (
        <section className="space-y-5 pb-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold">Your Wardrobe</h1>
                    <p className="text-sm md:text-base text-zinc-500">All your tracked outfits and clothing items</p>
                </div>
                {/* header button hidden; floating button below keeps it always visible */}
            </div>

            {/* Category chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {CATEGORIES.map((c) => {
                    const active = c === cat;
                    return (
                        <button
                            key={c}
                            onClick={() => setCat(c)}
                            className={`px-3 py-1.5 rounded-full text-sm border transition-colors whitespace-nowrap ${active
                                ? "bg-black text-white border-black"
                                : "bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-100"
                                }`}
                        >
                            {c}
                        </button>
                    );
                })}
            </div>

            {/* Floating Shuffle button (always visible) */}
            <button
                onClick={onShuffle}
                className="fixed right-4 top-4 z-50 rounded-full bg-orange-500 text-white px-4 py-2 text-sm font-semibold shadow-lg hover:bg-orange-600 active:scale-[0.98]"
                aria-label="Shuffle outfit"
            >
                Shuffle ↻
            </button>

            {/* Center-column preview for small screens only (kept simple) */}
            <div className="mx-auto max-w-sm w-full relative md:hidden">
                <div className="flex flex-col items-center gap-3">
                    <img src={outfit.top.src} alt="Selected top" className="h-40 object-contain drop-shadow" />
                    <img src={outfit.bottom.src} alt="Selected bottoms" className="h-56 object-contain drop-shadow" />
                    <img src={outfit.shoe.src} alt="Selected shoes" className="h-24 object-contain drop-shadow" />
                </div>
            </div>

            {/* Grid with reserved middle column on desktop */}
            <div className="md:grid md:grid-cols-[1fr_16rem_1fr] md:gap-x-8">
                {/* Sticky preview column */}
                <div className="hidden md:block md:col-start-2 md:row-span-4 pointer-events-none relative z-20 h-[70vh] flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                        <img src={outfit.top.src} alt="Selected top" className="h-48 object-contain drop-shadow" />
                        <img src={outfit.bottom.src} alt="Selected bottoms" className="h-64 object-contain drop-shadow" />
                        <img src={outfit.shoe.src} alt="Selected shoes" className="h-28 object-contain drop-shadow" />
                    </div>
                </div>

                {/* Library split by category */}
                {cat === "All" ? (
                    <div className="md:col-span-3 space-y-6">
                        {(["Tops", "Bottoms", "Shoes"] as const).map((section) => {
                            const list = allByCategory[section];
                            const selectedId = section === "Tops" ? outfit.top.id : section === "Bottoms" ? outfit.bottom.id : outfit.shoe.id;
                            const idx = list.findIndex((i) => i.id === selectedId);
                            const leftItems = idx > -1 ? list.slice(0, idx) : list;
                            const rightItems = idx > -1 ? list.slice(idx + 1) : [];
                            return (
                                <div key={section} className="md:grid md:grid-cols-[1fr_16rem_1fr] md:gap-x-8">
                                    <div className="md:col-span-3 flex items-center justify-between mb-2">
                                        <h3 className="font-semibold text-zinc-800">{section}</h3>
                                        <button onClick={() => setCat(section)} className="text-xs text-zinc-500 hover:text-zinc-700">View all</button>
                                    </div>
                                    {/* Left side (items before selected) */}
                                    <div className="w-full flex gap-3 overflow-x-auto pb-2 justify-end pr-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                        {leftItems.map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() =>
                                                    setOutfit((o) => ({
                                                        top: item.category === "Tops" ? item : o.top,
                                                        bottom: item.category === "Bottoms" ? item : o.bottom,
                                                        shoe: item.category === "Shoes" ? item : o.shoe,
                                                    }))
                                                }
                                                className="rounded-xl border bg-white p-2 w-28 h-28 md:w-48 md:h-48 flex items-center justify-center active:scale-[0.98]"
                                                aria-label={`Use ${item.id} in outfit`}
                                            >
                                                <img src={item.src} alt={item.id} className="max-h-full max-w-full object-contain filter saturate-75 opacity-85" />
                                            </button>
                                        ))}
                                    </div>
                                    {/* Middle: include selected item as part of the row */}
                                    <div className="hidden md:flex items-center justify-center">
                                        {idx > -1 && (
                                            <button
                                                key={list[idx].id}
                                                onClick={() =>
                                                    setOutfit((o) => ({
                                                        top: list[idx].category === "Tops" ? list[idx] : o.top,
                                                        bottom: list[idx].category === "Bottoms" ? list[idx] : o.bottom,
                                                        shoe: list[idx].category === "Shoes" ? list[idx] : o.shoe,
                                                    }))
                                                }
                                                className="rounded-xl border-2 border-orange-300 bg-white p-2 w-28 h-28 md:w-48 md:h-48 flex items-center justify-center"
                                                aria-label={`Selected ${list[idx].id}`}
                                            >
                                                <img src={list[idx].src} alt={list[idx].id} className="max-h-full max-w-full object-contain" />
                                            </button>
                                        )}
                                    </div>
                                    {/* Right side (items after selected) */}
                                    <div className="w-full flex gap-3 overflow-x-auto pb-2 justify-start pl-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                        {rightItems.map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() =>
                                                    setOutfit((o) => ({
                                                        top: item.category === "Tops" ? item : o.top,
                                                        bottom: item.category === "Bottoms" ? item : o.bottom,
                                                        shoe: item.category === "Shoes" ? item : o.shoe,
                                                    }))
                                                }
                                                className="rounded-xl border bg-white p-2 w-28 h-28 md:w-48 md:h-48 flex items-center justify-center active:scale-[0.98]"
                                                aria-label={`Use ${item.id} in outfit`}
                                            >
                                                <img src={item.src} alt={item.id} className="max-h-full max-w-full object-contain filter saturate-75 opacity-85" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="space-y-2">
                        <h3 className="font-semibold text-zinc-800">{cat}</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {currentList.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() =>
                                        setOutfit((o) => ({
                                            top: item.category === "Tops" ? item : o.top,
                                            bottom: item.category === "Bottoms" ? item : o.bottom,
                                            shoe: item.category === "Shoes" ? item : o.shoe,
                                        }))
                                    }
                                    className="rounded-xl border bg-white p-2 w-28 h-28 md:w-48 md:h-48 flex items-center justify-center active:scale-[0.98]"
                                    aria-label={`Use ${item.id} in outfit`}
                                >
                                    <img src={item.src} alt={item.id} className="max-h-full max-w-full object-contain" />
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
