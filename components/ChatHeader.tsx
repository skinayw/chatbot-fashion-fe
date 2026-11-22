type Props = {
  status: "online" | "gangguan";
  onNewChat: () => void;
};

export default function ChatHeader({ status, onNewChat }: Props) {
  const online = status === "online";

  return (
    <header className="flex items-center justify-between gap-4 border-b border-zinc-200 bg-white px-4 py-3 sm:px-8 sm:py-4">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-zinc-900 sm:h-10 sm:w-10">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 8V7a2 2 0 1 0-2-2" />
            <path d="M12 8l8.5 6.2a1.2 1.2 0 0 1-.7 2.2H4.2a1.2 1.2 0 0 1-.7-2.2L12 8z" />
          </svg>
        </div>
        <div className="min-w-0">
          <h1 className="truncate text-[15px] font-semibold leading-5 sm:text-base">
            Asisten Toko Fashion
          </h1>
          <div className="flex items-center gap-1.5 text-xs text-zinc-600 sm:text-[13px]">
            <span className={`h-2 w-2 rounded-full ${online ? "bg-green-700" : "bg-amber-700"}`} />
            <span>{online ? "Online" : "Sedang gangguan"}</span>
          </div>
        </div>
      </div>

      <button
        onClick={onNewChat}
        aria-label="Percakapan baru"
        className="flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-[10px] border border-zinc-300 bg-white px-3 text-sm font-medium hover:bg-zinc-50 sm:px-4"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M12 5v14M5 12h14" />
        </svg>
        <span className="hidden sm:inline">Percakapan baru</span>
      </button>
    </header>
  );
}