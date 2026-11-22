import type { Product } from "@/lib/types";

const rupiah = (n: number) => "Rp" + n.toLocaleString("id-ID");

export default function ProductCard({ product }: { product: Product }) {
  return (
    <a
      href={`/produk/${product.slug}`}
      className="flex w-44 shrink-0 flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white hover:border-zinc-400"
    >
      <div className="aspect-square bg-zinc-100">
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-zinc-500">
            Tanpa gambar
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="line-clamp-2 text-sm font-medium leading-5">{product.name}</div>
        <div className="mt-1 text-sm font-semibold">{rupiah(product.price)}</div>
        <div className="mt-2 text-xs font-medium text-zinc-600">Lihat produk →</div>
      </div>
    </a>
  );
}