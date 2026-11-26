const SARAN = [
  "Ada kaos oversize hitam?",
  "Cari outer",
  "Berapa lama pengiriman?",
  "Bisa tukar ukuran?",
];

type Props = {
  onPick: (text: string) => void;
  restoring?: boolean; // true saat riwayat percakapan sedang diambil dari server
};

export default function EmptyState({ onPick, restoring = false }: Props) {
  // Saat riwayat dipulihkan, jangan tampilkan sapaan awal
  if (restoring) {
    return (
      <div className="flex flex-1 items-center justify-center px-4 py-6">
        <p className="text-sm text-text-muted">Memuat percakapan...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-6 text-center">
      <h2 className="text-[26px] font-bold leading-8 tracking-tight sm:text-[32px] sm:leading-10">
        Mau cari apa hari ini?
      </h2>
      <p className="max-w-md text-[15px] leading-[22px] text-text-muted sm:text-base sm:leading-6">
        Tanyakan produk, stok, ukuran, pengiriman, atau penukaran. Jawaban diambil dari data toko.
      </p>
      <div className="mt-2 flex w-full max-w-xl flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-center">
        {SARAN.map((s) => (
          <button
            key={s}
            onClick={() => onPick(s)}
            className="min-h-12 rounded-card border border-border-strong bg-surface px-[18px] text-left text-[15px] hover:bg-surface-muted sm:min-h-11 sm:rounded-full sm:text-center sm:text-sm"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}