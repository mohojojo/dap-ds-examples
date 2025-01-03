export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
}

export type SearchResult = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
