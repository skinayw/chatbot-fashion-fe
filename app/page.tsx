"use client";

import { useEffect, useRef, useState } from "react";
import ChatHeader from "@/components/ChatHeader";
import ChatInput from "@/components/ChatInput";
import EmptyState from "@/components/EmptyState";
import MessageBubble from "@/components/MessageBubble";
import ProductCard from "@/components/ProductCard";
import TypingIndicator from "@/components/TypingIndicator";
import { sendChat, getHistory } from "@/lib/api";
import type { Message } from "@/lib/types";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [lastText, setLastText] = useState("");
  const requestRef = useRef(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const STORAGE_KEY = "chat_conversation_id";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function ask(text: string) {
    const myRequest = ++requestRef.current;
    setLoading(true);

    const result = await sendChat(text, conversationId);

    // Kalau pengguna menekan "Percakapan baru" selagi menunggu, abaikan balasan ini.
    if (myRequest !== requestRef.current) return;

    if (result.ok) {
      setConversationId(result.conversationId);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: result.reply, products: result.products },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: result.message, error: true },
      ]);
    }
    setLoading(false);
  }

  function send(text: string) {
    setLastText(text);
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    ask(text);
  }

  function retry() {
    setMessages((prev) => prev.slice(0, -1)); // buang bubble error terakhir
    ask(lastText);
  }

  function reset() {
    requestRef.current++;
    setMessages([]);
    setConversationId(null);
    setLoading(false);
  }

  // 1. Saat halaman dibuka: pulihkan percakapan lama kalau ada
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {}
    if (!saved) return;

    getHistory(saved).then((history) => {
      if (history && history.length > 0) {
        setMessages(history);
        setConversationId(saved);
      } else {
        // id sudah tidak valid, bersihkan
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {}
      }
    });
  }, []);

  // 2. Setiap kali ada conversation_id baru dari server: simpan
  useEffect(() => {
    if (!conversationId) return;
    try {
      localStorage.setItem(STORAGE_KEY, conversationId);
    } catch {}
  }, [conversationId]);

  return (
    <div className="flex h-dvh flex-col bg-stone-100 text-zinc-900">
      <ChatHeader status="online" onNewChat={reset} />

      <main className="flex flex-1 flex-col overflow-y-auto px-4 py-6">
        {messages.length === 0 && !loading ? (
          <EmptyState onPick={send} />
        ) : (
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-3">
            {messages.map((m, i) => (
              <div key={i} className="flex flex-col gap-2">
                <MessageBubble
                  message={m}
                  onRetry={m.error && i === messages.length - 1 ? retry : undefined}
                />
                {m.products && m.products.length > 0 && (
                  <div className="flex gap-3 overflow-x-auto pb-1">
                    {m.products.map((p) => (
                      <ProductCard key={p.slug} product={p} />
                    ))}
                  </div>
                )}
              </div>
            ))}
            {loading && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>
        )}
      </main>

      <ChatInput onSend={send} disabled={loading} />
    </div>
  );
}