import { Megaphone, Share2, Users } from "lucide-react";

export default function Home({ onAddOutfit }: { onAddOutfit?: () => void }) {
    return (
        <section className="space-y-6">
            {/* Challenge Banner */}
            <div className="rounded-2xl border shadow-sm bg-gradient-to-r from-orange-50 to-white p-4 sm:p-5 flex items-start gap-3">
                <div className="mt-0.5 rounded-full bg-orange-100 text-orange-700 w-7 h-7 flex items-center justify-center">
                    <Megaphone size={16} />
                </div>
                <div className="flex-1">
                    <div className="font-semibold">Daily Fashion Challenge</div>
                    <div className="text-sm text-zinc-600">Complete today's activities to earn points for partner discounts!</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                        <button className="inline-flex items-center gap-2 rounded-lg bg-orange-500 text-white px-3 py-1.5 text-sm">
                            <Share2 size={14} /> Share Today's Outfit (+10 pts)
                        </button>
                        <button className="inline-flex items-center gap-2 rounded-lg bg-white border px-3 py-1.5 text-sm">
                            <Users size={14} /> Vote on Friends' Outfits (+5 pts)
                        </button>
                    </div>
                </div>
            </div>

            {/* Journey */}
            <div>
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-extrabold">Your Outfit Journey</h1>
                    <button onClick={onAddOutfit} className="rounded-full bg-orange-500 text-white px-3 py-1.5 text-sm">Add Outfit</button>
                </div>
                <div className="text-sm text-zinc-500">Mirror selfies and outfit pics</div>

                <div className="mt-4 h-[320px] w-[260px] bg-white/80 border rounded-2xl shadow-sm flex items-center justify-center text-zinc-400">
                    Empty — post today’s outfit!
                </div>
            </div>
        </section>
    );
}
