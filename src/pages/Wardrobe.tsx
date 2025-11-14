import { useState } from "react";
import ex1 from "../assets/example1.png";
import ex2 from "../assets/example2.png";
import ex3 from "../assets/example3.png";
import ex4 from "../assets/example4.png";
import ex5 from "../assets/example5.png";
import ex6 from "../assets/example6.png";

const CATEGORIES = [
    "All",
    "Casual",
    "Professional",
    "Athletic",
    "Formal",
    "Spring",
    "Summer",
    "Fall",
    "Winter",
] as const;

type Category = typeof CATEGORIES[number];

const MOCK_IMAGES: Array<{ id: string; src: string; category: Exclude<Category, "All"> }> = [
    { id: "1", src: ex1, category: "Casual" },
    { id: "2", src: ex2, category: "Professional" },
    { id: "3", src: ex3, category: "Athletic" },
    { id: "4", src: ex4, category: "Casual" },
    { id: "5", src: ex5, category: "Casual" },
    { id: "6", src: ex6, category: "Fall" },
];

export default function Wardrobe() {
    const [cat, setCat] = useState<Category>("All");
    const filtered = cat === "All" ? MOCK_IMAGES : MOCK_IMAGES.filter((i) => i.category === cat);

    return (
        <section className="space-y-5">
            <h1 className="text-2xl md:text-3xl font-extrabold">Your Wardrobe</h1>
            <p className="text-sm md:text-base text-zinc-500">Example bird's eye view outfit photos</p>

            {/* Filter chips */}
            <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => {
                    const active = c === cat;
                    return (
                        <button
                            key={c}
                            onClick={() => setCat(c)}
                            className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-sm md:text-base border transition-colors ${active ? "bg-black text-white border-black" : "bg-white text-zinc-700 hover:bg-zinc-100"
                                }`}
                        >
                            {c}
                        </button>
                    );
                })}
            </div>

            {/* Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {filtered.map((card) => (
                    <div key={card.id} className="relative rounded-2xl border bg-white shadow-sm overflow-hidden">
                        <img src={card.src} alt={card.category} className="w-full aspect-[4/3] object-cover" />
                        <span className="absolute top-2 right-2 px-2 py-0.5 text-xs rounded-full bg-white/80">Example</span>
                        <div className="px-3 py-2 text-sm md:text-base text-zinc-500">{card.category}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
