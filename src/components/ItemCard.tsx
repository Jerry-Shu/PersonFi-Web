import type { ClothingItem } from "../types/models";

export default function ItemCard({ item }: { item: ClothingItem }) {
    return (
        <div className="p-4 rounded-2xl bg-white shadow-sm border flex items-center gap-3">
            <div
                className="w-8 h-8 rounded-md border"
                style={{ background: item.colorHex }}
                aria-label={`Color ${item.colorHex}`}
            />
            <div className="flex-1">
                <div className="font-semibold">{item.name}</div>
                <div className="text-sm text-zinc-500">{item.category[0].toUpperCase() + item.category.slice(1)}</div>
            </div>
            {item.productURL && (
                <a href={item.productURL} target="_blank" className="text-sm text-blue-600 hover:underline">
                    View
                </a>
            )}
        </div>
    );
}
