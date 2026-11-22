export default function TypingIndicator() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center gap-2.5 self-start rounded-2xl rounded-bl-sm border border-zinc-200 bg-white px-4 py-3.5"
    >
      <span className="flex gap-1">
        <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-zinc-600" />
        <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-zinc-600 [animation-delay:0.2s]" />
        <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-zinc-600 [animation-delay:0.4s]" />
      </span>
      <span className="text-[13px] text-zinc-600">sedang mengetik...</span>
    </div>
  );
}