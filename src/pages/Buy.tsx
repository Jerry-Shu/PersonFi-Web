function Card({ title, tag, desc }: { title: string; tag: string; desc: string }) {
    return (
        <div className="rounded-xl border bg-white shadow-sm p-4 flex flex-col gap-3">
            <div className="text-sm text-zinc-500">{tag}</div>
            <div className="font-semibold">{title}</div>
            <div className="text-sm text-zinc-600">{desc}</div>
            <button className="self-start rounded-lg border px-3 py-1.5 text-sm">Explore Options</button>
        </div>
    );
}

export default function Buy() {
    return (
        <section className="space-y-6">
            <h1 className="text-2xl font-extrabold">Shopping Recommendations</h1>
            <p className="text-sm text-zinc-600">Smart suggestions based on your wardrobe of 0 items</p>

            {["Casual", "Professional", "Athletic"].map((section) => (
                <div key={section} className="rounded-2xl border bg-gradient-to-b from-orange-50/50 to-white p-4 sm:p-5 space-y-4">
                    <div className="flex items-center gap-2 text-sm text-orange-700">
                        <span className="px-2 py-0.5 bg-orange-100 rounded-full text-xs">High Priority</span>
                        <span className="px-2 py-0.5 bg-zinc-100 rounded-full text-xs">{section}</span>
                    </div>
                    <div className="font-semibold">Build Your {section} Collection</div>
                    <div className="text-sm text-zinc-600">You don't have any {section.toLowerCase()} items yet. Building this category will give you more outfit options.</div>

                    <div className="grid sm:grid-cols-3 gap-3">
                        <Card title="Classic Denim Jeans" tag="Denim" desc="Versatile everyday essential" />
                        <Card title="Cotton T-Shirt Set" tag="Cotton" desc="Comfortable basics for any season" />
                        <Card title="Casual Sneakers" tag="Cotton" desc="Complete your casual looks" />
                    </div>
                </div>
            ))}
        </section>
    );
}
