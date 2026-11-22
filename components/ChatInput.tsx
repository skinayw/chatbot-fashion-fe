import { useState } from "react";
import type { FormEvent } from "react";

type Props = {
  onSend: (text: string) => void;
  disabled?: boolean;
};

const MAX = 500;

export default function ChatInput({ onSend, disabled = false }: Props) {
  const [text, setText] = useState("");
  const canSend = text.trim().length > 0 && !disabled;

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!canSend) return;
    onSend(text.trim());
    setText("");
  }

  return (
    <footer className="px-4 pb-5 pt-2 sm:px-6 sm:pb-6">
      <form onSubmit={submit} className="mx-auto max-w-3xl">
        <div className="flex items-center gap-2 rounded-2xl border border-zinc-300 bg-white py-1.5 pl-4 pr-1.5 sm:pl-5">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={MAX}
            disabled={disabled}
            placeholder="Tulis pertanyaan..."
            aria-label="Tulis pertanyaan"
            className="h-11 min-w-0 flex-1 bg-transparent text-base outline-none disabled:text-zinc-500"
          />
          <button
            type="submit"
            disabled={!canSend}
            aria-label="Kirim"
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
        <div className="mt-2 flex justify-between gap-4 text-xs text-zinc-600">
          <span>Dijawab oleh AI dari data toko. Stok bersifat perkiraan.</span>
          <span>{text.length}/{MAX}</span>
        </div>
      </form>
    </footer>
  );
}