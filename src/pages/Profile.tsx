import { Share2 } from "lucide-react";

export default function Profile() {
    return (
        <section className="space-y-6">
            <div className="rounded-2xl border bg-white shadow-sm p-5 flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-zinc-200" />
                <div className="flex-1">
                    <div className="font-semibold">Sustainable fashion enthusiast</div>
                    <div className="mt-1 flex flex-wrap gap-2 text-xs">
                        <span className="px-2 py-0.5 rounded-full bg-zinc-100">0 Items</span>
                        <span className="px-2 py-0.5 rounded-full bg-zinc-100">0 Points</span>
                        <span className="px-2 py-0.5 rounded-full bg-zinc-100">Starter Tier</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="rounded-lg bg-orange-500 text-white px-3 py-1.5 text-sm">Edit Profile</button>
                    <button className="rounded-lg border px-3 py-1.5 text-sm inline-flex items-center gap-2"><Share2 size={14} /> Share</button>
                </div>
            </div>

            <div className="rounded-2xl border bg-white shadow-sm p-5">
                <div className="font-semibold">Rewards & Partner Discounts</div>
                <div className="mt-2 rounded-xl bg-orange-50 border p-4 flex items-center justify-between">
                    <div>
                        <div className="font-semibold">Starter Member</div>
                        <div className="text-sm text-zinc-600">Earn points by sharing outfits and voting on friends' fashion choices!</div>
                        <div className="text-sm text-zinc-600 mt-2">Current Discount: <span className="text-orange-700 font-medium">5%</span> · Total Points: 0</div>
                    </div>
                    <button className="rounded-lg bg-orange-500 text-white px-3 py-1.5 text-sm">Redeem Rewards</button>
                </div>

                <div className="mt-4 grid sm:grid-cols-2 gap-3">
                    <div className="rounded-xl bg-white border p-4">
                        <div className="font-medium">Post Daily Outfit</div>
                        <div className="text-sm text-zinc-600">+10 points</div>
                    </div>
                    <div className="rounded-xl bg-white border p-4">
                        <div className="font-medium">Vote on Friend's Outfit</div>
                        <div className="text-sm text-zinc-600">+5 points</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
