"use client";

import { useEffect, useRef, useState } from "react";
import ChatHeader from "@/components/ChatHeader";
import ChatInput from "@/components/ChatInput";
import EmptyState from "@/components/EmptyState";
import MessageBubble from "@/components/MessageBubble";
import ProductCard from "@/components/ProductCard";
import TypingIndicator from "@/components/TypingIndicator";
import type { Message, Product } from "@/lib/types";

// Data contoh sementara untuk melihat kartu produk. Nanti diganti data dari Laravel.
const contohProduk: Product[] = [
  { name: "Kaos Oversize Basic", price: 89000, image_url: null, slug: "kaos-oversize-basic" },
  { name: "Kaos Boxy Putih", price: 95000, image_url: null, slug: "kaos-boxy-putih" },
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function send(text: string) {
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);

    // SEMENTARA: balasan tiruan. Besok diganti fetch ke Laravel.
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Ini balasan contoh untuk: " + text, products: contohProduk },
      ]);
      setLoading(false);
    }, 1200);
  }

  function reset() {
    setMessages([]);
    setLoading(false);
  }

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
                <MessageBubble message={m} />
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