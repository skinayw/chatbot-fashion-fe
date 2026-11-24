import type { Product } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

export type ChatResult =
  | { ok: true; reply: string; conversationId: string; products: Product[] }
  | { ok: false; kind: "busy" | "rate-limit" | "offline" | "invalid"; message: string; retryAfter?: number };

export async function sendChat(
  message: string,
  conversationId: string | null
): Promise<ChatResult> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ message, conversation_id: conversationId }),
    });
  } catch {
    return { ok: false, kind: "offline", message: "Tidak ada koneksi. Periksa internetmu, lalu coba lagi." };
  }

  if (res.ok) {
    const data = await res.json();
    return {
      ok: true,
      reply: data.reply,
      conversationId: data.conversation_id,
      products: data.products ?? [],
    };
  }

  if (res.status === 429) {
    const retryAfter = Number(res.headers.get("Retry-After")) || 60;
    return {
      ok: false,
      kind: "rate-limit",
      retryAfter,
      message: `Terlalu banyak pesan dalam waktu singkat. Tunggu sekitar ${retryAfter} detik, lalu kirim lagi.`,
    };
  }

  if (res.status === 422) {
    return { ok: false, kind: "invalid", message: "Pesan tidak valid. Maksimal 500 karakter." };
  }

  return { ok: false, kind: "busy", message: "Maaf, layanan sedang sibuk. Coba lagi sebentar ya." };
}