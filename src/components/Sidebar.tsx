import { Home, Shirt, CalendarDays, BarChart2, ShoppingBag, User, Settings as SettingsIcon } from "lucide-react";
import React from "react";

export type Page = "home" | "wardrobe" | "daily" | "analytics" | "buy" | "profile" | "settings";

export default function Sidebar({ page, onChange }: { page: Page; onChange: (p: Page) => void }) {
    const Item = ({ id, icon, label }: { id: Page; icon: React.ReactNode; label: string }) => {
        const active = page === id;
        return (
            <button
                onClick={() => onChange(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-base transition ${active ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-600 hover:text-zinc-900 hover:bg-white/60"
                    }`}
                aria-current={active ? "page" : undefined}
            >
                {icon}
                <span className="hidden md:inline">{label}</span>
            </button>
        );
    };

    return (
        <aside className="md:w-56 w-16 shrink-0 border-r bg-orange-50/70 min-h-screen p-3 sticky top-0">
            <div className="px-2 py-2 text-lg font-semibold hidden md:block">Wardrobee</div>
            <nav className="mt-2 space-y-1">
                <div className="px-2 text-xs uppercase tracking-wide text-zinc-500">Navigation</div>
                <div className="px-2 py-2 space-y-1">
                    <Item id="home" icon={<Home size={20} />} label="Home" />
                    <Item id="wardrobe" icon={<Shirt size={20} />} label="Wardrobe" />
                    <Item id="daily" icon={<CalendarDays size={20} />} label="Daily Outfits" />
                    <Item id="analytics" icon={<BarChart2 size={20} />} label="Analytics" />
                    <Item id="buy" icon={<ShoppingBag size={20} />} label="Buy" />
                    <Item id="profile" icon={<User size={20} />} label="Profile" />
                    <Item id="settings" icon={<SettingsIcon size={20} />} label="Settings" />
                </div>
            </nav>
        </aside>
    );
}
