export default function TagChip({ text }: { text: string }) {
    return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-700">
            {text}
        </span>
    );
}
