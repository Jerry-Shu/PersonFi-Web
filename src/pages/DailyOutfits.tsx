export default function DailyOutfits() {
    return (
        <section className="space-y-6">
            <div className="rounded-2xl p-10 bg-[radial-gradient(800px_600px_at_0%_0%,#f7b5ff_0%,transparent_60%),radial-gradient(900px_600px_at_100%_20%,#ffd1a6_0%,transparent_60%),linear-gradient(135deg,#fff0f6, #eaf7ff)] border shadow-sm">
                <h1 className="text-3xl font-extrabold text-center">Daily Outfits</h1>
                <p className="text-center text-zinc-600">Your outfit journey</p>
                <div className="mt-10 flex justify-center">
                    <div className="relative rotate-[-4deg]">
                        <div className="w-[180px] h-[220px] bg-white rounded-lg shadow-xl flex items-center justify-center border">
                            <div className="w-[150px] h-[150px] bg-zinc-200 rounded"></div>
                        </div>
                        <div className="absolute bottom-2 w-full text-center text-xs text-zinc-600">Nov 10</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
