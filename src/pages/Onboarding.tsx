import { useEffect, useMemo, useRef, useState } from "react";
import { useLocalStore } from "../hooks/useLocalStore";
import type { OnboardingPrefs } from "../types/models";

const COLOR_OPTIONS = [
    "Black",
    "White",
    "Beige",
    "Navy",
    "Gray",
    "Pink",
    "Red",
    "Blue",
    "Green",
    "Purple",
    "Yellow",
] as const;

const AESTHETICS = [
    "Minimalist",
    "Streetwear",
    "Vintage",
    "Preppy",
    "Boho",
    "Edgy",
    "Classic",
    "Y2K",
    "Cottagecore",
] as const;

export default function Onboarding({ onComplete }: { onComplete: () => void }) {
    const [prefs, setPrefs] = useLocalStore<OnboardingPrefs>("pf_prefs", {
        styleIcon: "",
        favoriteColors: [],
        aesthetics: [],
        wardrobePhotos: [],
    });
    const [step, setStep] = useState(0); // 0..3

    function next() {
        if (step < 3) setStep(step + 1);
        else finish();
    }

    function skip() {
        finish();
    }

    function finish() {
        // small debounce to ensure prefs saved
        setTimeout(() => onComplete(), 0);
    }

    const progress = useMemo(() => ((step + 1) / 4) * 100, [step]);

    return (
        <div className="min-h-screen onboarding-bg flex items-center justify-center p-4 md:p-6">
            <div className="relative w-full max-w-[min(90vw,42rem)] sm:max-w-[min(80vw,46rem)] md:max-w-[min(70vw,50rem)]">
                <button onClick={skip} className="absolute -top-2 right-0 text-sm text-white/80 hover:text-white">Skip</button>
                <div className="rounded-3xl bg-white shadow-xl border overflow-hidden">
                    <header className="p-6 md:p-7 border-b">
                        <div className="text-2xl md:text-3xl font-extrabold">Welcome to Wardrobe</div>
                        <div className="text-sm md:text-base text-zinc-500">Help us understand your style!</div>
                        <div className="mt-4 h-1.5 rounded-full bg-zinc-100">
                            <div className="h-1 rounded-full bg-pink-400 transition-all" style={{ width: `${progress}%` }} />
                        </div>
                    </header>

                    {step === 0 && <StepIcon value={prefs.styleIcon ?? ""} onChange={(v) => setPrefs({ ...prefs, styleIcon: v })} onNext={next} />}
                    {step === 1 && (
                        <StepColors
                            selected={prefs.favoriteColors}
                            onToggle={(c) => {
                                const has = prefs.favoriteColors.includes(c);
                                setPrefs({
                                    ...prefs,
                                    favoriteColors: has ? prefs.favoriteColors.filter((x: string) => x !== c) : [...prefs.favoriteColors, c],
                                });
                            }}
                            onNext={next}
                        />
                    )}
                    {step === 2 && (
                        <StepAesthetic
                            selected={prefs.aesthetics}
                            onToggle={(a) => {
                                const has = prefs.aesthetics.includes(a);
                                setPrefs({ ...prefs, aesthetics: has ? prefs.aesthetics.filter((x: string) => x !== a) : [...prefs.aesthetics, a] });
                            }}
                            onNext={next}
                        />
                    )}
                    {step === 3 && (
                        <StepUpload
                            photos={prefs.wardrobePhotos}
                            onAdd={(url) => setPrefs({ ...prefs, wardrobePhotos: [...prefs.wardrobePhotos, url].slice(0, 10) })}
                            onRemove={(url) => setPrefs({ ...prefs, wardrobePhotos: prefs.wardrobePhotos.filter((u: string) => u !== url) })}
                            onFinish={finish}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

function StepIcon({ value, onChange, onNext }: { value: string; onChange: (v: string) => void; onNext: () => void }) {
    return (
        <div className="p-6 md:p-7 space-y-5">
            <div>
                <div className="font-semibold flex items-center gap-2">
                    <span className="text-pink-500">♡</span>
                    Who inspires your style?
                </div>
                <div className="mt-1 text-sm text-zinc-500">Think of a celebrity, influencer, or style icon whose wardrobe you admire.</div>
            </div>

            <label className="block">
                <div className="text-sm font-medium">Celebrity or Style Icon</div>
                <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="e.g., Zendaya, Harry Styles, Emma Chamberlain"
                    className="mt-1 w-full rounded-lg border px-3 py-2.5"
                />
            </label>

            <div className="pt-2 flex justify-end">
                <button onClick={onNext} className="rounded-lg bg-pink-500 text-white font-semibold px-5 py-2.5">
                    Next →
                </button>
            </div>
        </div>
    );
}

function StepColors({
    selected,
    onToggle,
    onNext,
}: {
    selected: string[];
    onToggle: (c: string) => void;
    onNext: () => void;
}) {
    return (
        <div className="p-6 md:p-7 space-y-5">
            <div className="font-semibold flex items-center gap-2">
                <span className="text-pink-500">◼︎</span>
                What are your favorite colors?
            </div>
            <div className="text-sm text-zinc-500">Select at least one color you love wearing.</div>

            <div className="flex flex-wrap gap-2">
                {COLOR_OPTIONS.map((c) => {
                    const active = selected.includes(c);
                    return (
                        <button
                            key={c}
                            onClick={() => onToggle(c)}
                            className={`px-3 py-1 rounded-full text-sm font-semibold border transition-colors ${active ? "bg-black text-white border-black" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                                }`}
                        >
                            {c}
                        </button>
                    );
                })}
            </div>

            <div className="pt-2 flex justify-end">
                <button onClick={onNext} className="rounded-lg bg-pink-500 text-white font-semibold px-5 py-2.5">
                    Next →
                </button>
            </div>
        </div>
    );
}

function StepAesthetic({
    selected,
    onToggle,
    onNext,
}: {
    selected: string[];
    onToggle: (a: string) => void;
    onNext: () => void;
}) {
    return (
        <div className="p-6 md:p-7 space-y-5">
            <div className="font-semibold flex items-center gap-2">
                <span className="text-pink-500">★</span>
                What's your aesthetic?
            </div>
            <div className="text-sm text-zinc-500">Choose the style that best describes your wardrobe vibe.</div>

            <div className="grid grid-cols-3 gap-2">
                {AESTHETICS.map((a) => {
                    const active = selected.includes(a);
                    return (
                        <button
                            key={a}
                            onClick={() => onToggle(a)}
                            className={`px-3 py-2 rounded-lg text-sm font-semibold border transition-colors ${active ? "bg-black text-white border-black" : "bg-zinc-50 text-zinc-700 hover:bg-zinc-100"
                                }`}
                        >
                            {a}
                        </button>
                    );
                })}
            </div>

            <div className="pt-2 flex justify-end">
                <button onClick={onNext} className="rounded-lg bg-pink-500 text-white font-semibold px-5 py-2.5">
                    Next →
                </button>
            </div>
        </div>
    );
}

function StepUpload({
    photos,
    onAdd,
    onRemove,
    onFinish,
}: {
    photos: string[];
    onAdd: (url: string) => void;
    onRemove: (url: string) => void;
    onFinish: () => void;
}) {
    const inputRef = useRef<HTMLInputElement>(null);

    function pick() {
        inputRef.current?.click();
    }

    function onFiles(e: React.ChangeEvent<HTMLInputElement>) {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;
        for (const f of files.slice(0, 10)) {
            const url = URL.createObjectURL(f);
            onAdd(url);
        }
    }

    useEffect(() => {
        return () => {
            // revoke when unmounting to avoid leaks
            photos.forEach((u) => URL.revokeObjectURL(u));
        };
    }, []);

    return (
        <div className="p-6 md:p-7 space-y-5">
            <div className="font-semibold flex items-center gap-2">
                <span className="text-pink-500">👕</span>
                Upload your wardrobe
            </div>
            <div className="text-sm text-zinc-500">Upload up to 10 photos of items or outfits from your current wardrobe.</div>
            <div className="text-xs text-zinc-400">Optional - you can skip this step</div>

            {photos.length === 0 ? (
                <div
                    onClick={pick}
                    className="mt-1 rounded-xl border border-dashed p-6 text-center text-sm text-zinc-500 hover:bg-zinc-50 cursor-pointer"
                >
                    Click to upload image (PNG, JPG up to 10MB)
                </div>
            ) : (
                <div className="grid grid-cols-4 gap-2">
                    {photos.map((u) => (
                        <div key={u} className="relative aspect-square rounded-lg overflow-hidden bg-zinc-100">
                            <img src={u} className="object-cover w-full h-full" />
                            <button
                                onClick={() => onRemove(u)}
                                className="absolute top-1 right-1 rounded-full bg-black/70 text-white w-6 h-6 text-xs"
                                title="Remove"
                            >
                                ×
                            </button>
                        </div>
                    ))}

                    {photos.length < 10 && (
                        <button
                            onClick={pick}
                            className="aspect-square rounded-lg border border-dashed text-3xl text-zinc-400 flex items-center justify-center hover:bg-zinc-50"
                            title="Add more"
                        >
                            +
                        </button>
                    )}
                </div>
            )}

            <input ref={inputRef} type="file" className="hidden" accept="image/*" multiple onChange={onFiles} />

            <div className="pt-2 flex justify-end">
                <button onClick={onFinish} className="rounded-lg bg-pink-500 text-white font-semibold px-5 py-2.5">
                    Start →
                </button>
            </div>
        </div>
    );
}
