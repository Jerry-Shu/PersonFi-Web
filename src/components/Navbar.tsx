import { Camera, Shirt, Sparkles } from "lucide-react";
import React from "react";

type Tab = "wardrobe" | "capture" | "match";

interface NavbarProps {
    tab: Tab;
    onChange: (t: Tab) => void;
}

export default function Navbar({ tab, onChange }: NavbarProps) {
    const NavItem = ({
        k,
        icon,
        label,
    }: {
        k: Tab;
        icon: React.ReactNode;

        label: string;
    }) => {
        const active = tab === k;
        return (
            <button
                onClick={() => onChange(k)}
                className={`flex items-center gap-3 px-5 py-3 rounded-2xl transition text-base leading-none
          ${active
                        ? "bg-white shadow text-zinc-900"
                        : "text-zinc-600 hover:text-zinc-800"
                    }`}
                aria-current={active ? "page" : undefined}
            >
                {icon}
                <span className="hidden sm:block font-medium">{label}</span>
            </button>
        );
    };

    return (
        <header className="sticky top-0 z-20 bg-zinc-50/70 backdrop-blur border-b">
            <div className="container mx-auto max-w-4xl flex items-center justify-between p-3 sm:p-4">
                <div className="font-semibold text-lg tracking-tight">PersonFi</div>

                <nav className="flex gap-3">
                    <NavItem k="wardrobe" icon={<Shirt size={22} />} label="Wardrobe" />
                    <NavItem k="capture" icon={<Camera size={22} />} label="Add" />
                    <NavItem k="match" icon={<Sparkles size={22} />} label="Match" />
                </nav>
            </div>
        </header>
    );
}
