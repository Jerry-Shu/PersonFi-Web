export default function Analytics() {
    return (
        <section className="space-y-6">
            <div>
                <h1 className="text-2xl font-extrabold">Analytics & Insights</h1>
                <p className="text-sm text-zinc-600">Understand your wardrobe usage patterns</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {[
                    { title: "Total Items", value: 0, sub: "In your wardrobe" },
                    { title: "Unworn Items", value: 0, sub: "Never worn" },
                    { title: "Avg Wear Count", value: 0, sub: "Per item" },
                    { title: "Most Worn", value: "None", sub: "Category" },
                ].map((c) => (
                    <div key={c.title} className="rounded-xl border bg-white shadow-sm p-4">
                        <div className="text-3xl font-bold">{c.value as any}</div>
                        <div className="font-semibold mt-1">{c.title}</div>
                        <div className="text-xs text-zinc-500">{c.sub}</div>
                    </div>
                ))}
            </div>

            <div className="rounded-xl border bg-white shadow-sm p-5">
                <div className="font-semibold">Material & Climate Analytics</div>
                <div className="text-sm text-zinc-500">No material data yet. Add clothing items with material information to see climate insights!</div>
            </div>

            <div className="rounded-xl border bg-white shadow-sm p-5">
                <div className="font-semibold">Wear Frequency</div>
                <div className="mt-4 space-y-4">
                    {[
                        { label: "Casual", pct: 68 },
                        { label: "Professional", pct: 52 },
                        { label: "Athletic", pct: 60 },
                        { label: "Formal", pct: 20 },
                    ].map((b) => (
                        <div key={b.label} className="space-y-1">
                            <div className="text-sm text-zinc-600 flex justify-between">
                                <span>{b.label}</span>
                                <span className="text-zinc-400">{Math.round((b.pct / 100) * 34)}× worn</span>
                            </div>
                            <div className="h-2.5 bg-zinc-100 rounded-full overflow-hidden">
                                <div className="h-full bg-orange-500/80" style={{ width: `${b.pct}%` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
