export type Product = {
  name: string;
  price: number;
  image_url: string | null;
  slug: string;
};

export type Message = {
  role: "user" | "assistant";
  content: string;
  products?: Product[];
  error?: boolean;
};