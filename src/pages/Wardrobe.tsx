import { useLocalStore } from "../hooks/useLocalStore";
import type { ClothingItem } from "../types/models";
import { mockItems } from "../data/mock";
import ItemCard from "../components/ItemCard";

export default function Wardrobe() {
    const [items] = useLocalStore<ClothingItem[]>("pf_items", mockItems);

    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-extrabold">Wardrobe</h1>
            </div>

            <div className="grid gap-3">
                {items.map(it => <ItemCard key={it.id} item={it} />)}
            </div>

            {items.length === 0 && (
                <div className="text-center text-zinc-500">No items yet. Add some from the “Add” tab.</div>
            )}
        </section>
    );
}
