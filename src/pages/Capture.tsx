import { useLocalStore } from "../hooks/useLocalStore";
import type { ClothingItem, Category } from "../types/models";
import { mockItems } from "../data/mock";
import { useRef, useState } from "react";

export default function Capture({ onDone }: { onDone?: () => void }) {
    const [items, setItems] = useLocalStore<ClothingItem[]>("pf_items", mockItems);
    const fileRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [name, setName] = useState("New Piece");
    const [category, setCategory] = useState<Category>("top");
    const [color, setColor] = useState("#777777");

    function onFile(e: React.ChangeEvent<HTMLInputElement>) {
        const f = e.target.files?.[0];
        if (!f) return;
        const url = URL.createObjectURL(f);
        setPreview(url);
    }

    function add() {
        const item: ClothingItem = {
            id: crypto.randomUUID(),
            name,
            category,
            colorHex: color,
            imageURL: preview ?? undefined,
            createdAt: new Date().toISOString(),
        };
        setItems([item, ...items]);
        onDone?.();
    }

    return (
        <section className="space-y-6">
            <h1 className="text-2xl font-extrabold">Add Item</h1>

            <div className="grid sm:grid-cols-2 gap-6">
                <div className="rounded-2xl p-4 bg-white border shadow-sm">
                    <div className="aspect-video rounded-lg bg-zinc-100 flex items-center justify-center overflow-hidden">
                        {preview ? (
                            <img src={preview} className="object-cover w-full h-full" />
                        ) : (
                            <div className="text-zinc-400">No image selected</div>
                        )}
                    </div>
                    <div className="mt-3">
                        <input ref={fileRef} type="file" accept="image/*" onChange={onFile} />
                    </div>
                </div>

                <div className="rounded-2xl p-4 bg-white border shadow-sm space-y-3">
                    <label className="block">
                        <div className="text-sm font-medium">Name</div>
                        <input value={name} onChange={e => setName(e.target.value)}
                            className="mt-1 w-full rounded-lg border px-3 py-2" />
                    </label>

                    <label className="block">
                        <div className="text-sm font-medium">Category</div>
                        <select value={category} onChange={e => setCategory(e.target.value as Category)}
                            className="mt-1 w-full rounded-lg border px-3 py-2">
                            <option value="top">Top</option>
                            <option value="bottom">Bottom</option>
                            <option value="shoes">Shoes</option>
                            <option value="outerwear">Outerwear</option>
                            <option value="accessory">Accessory</option>
                        </select>
                    </label>

                    <label className="block">
                        <div className="text-sm font-medium">Color</div>
                        <input type="color" value={color} onChange={e => setColor(e.target.value)}
                            className="mt-1 w-24 h-10 p-0 border rounded" />
                    </label>

                    <button onClick={add} className="mt-2 w-full rounded-lg bg-black text-white py-2 font-semibold">
                        Save to Wardrobe
                    </button>
                </div>
            </div>
        </section>
    );
}
