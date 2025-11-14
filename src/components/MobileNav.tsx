import { Home, Shirt, CalendarDays, User, Settings as SettingsIcon } from "lucide-react";
import type { Page } from "./Sidebar";

export default function MobileNav({ page, onChange }: { page: Page; onChange: (p: Page) => void }) {
    const Item = ({ id, icon, label }: { id: Page; icon: React.ReactNode; label: string }) => {
        const active = page === id;
        return (
            <button
                onClick={() => onChange(id)}
                className={`flex flex-col items-center justify-center gap-1 flex-1 py-2 text-xs ${active ? "text-zinc-900" : "text-zinc-500"
                    }`}
                aria-current={active ? "page" : undefined}
            >
                {icon}
                <span className="leading-none">{label}</span>
            </button>
        );
    };

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-white/90 backdrop-blur border-t">
            <div className="flex items-stretch px-2">
                <Item id="home" icon={<Home size={18} />} label="Home" />
                <Item id="wardrobe" icon={<Shirt size={18} />} label="Wardrobe" />
                <Item id="daily" icon={<CalendarDays size={18} />} label="Daily" />
                <Item id="profile" icon={<User size={18} />} label="Profile" />
                <Item id="settings" icon={<SettingsIcon size={18} />} label="Settings" />
            </div>
        </nav>
    );
}
