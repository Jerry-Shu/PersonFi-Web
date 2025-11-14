export default function Settings() {
    return (
        <section className="space-y-6">
            <h1 className="text-2xl font-extrabold">Settings</h1>
            <p className="text-sm text-zinc-600">Manage your preferences and account</p>

            <div className="rounded-2xl border bg-white shadow-sm p-5 space-y-5">
                <div className="font-semibold">Notifications</div>
                <div className="space-y-4">
                    {[
                        { label: "Daily outfit reminder", sub: "Get reminded to post your daily outfit" },
                        { label: "Unworn item alerts", sub: "Notify when items haven't been worn" },
                        { label: "Social updates", sub: "Get notified of likes and comments" },
                    ].map((n) => (
                        <label key={n.label} className="flex items-center justify-between gap-3">
                            <div>
                                <div className="font-medium text-sm">{n.label}</div>
                                <div className="text-xs text-zinc-500">{n.sub}</div>
                            </div>
                            <input type="checkbox" className="w-10 h-5" />
                        </label>
                    ))}
                </div>
            </div>

            <div className="rounded-2xl border bg-white shadow-sm p-5 space-y-4">
                <div className="font-semibold">Account</div>
                <button className="w-full rounded-full border px-3 py-2 text-sm">Export My Data</button>
                <button className="w-full rounded-full bg-red-600 text-white px-3 py-2 text-sm">Delete Account</button>
            </div>
        </section>
    );
}
