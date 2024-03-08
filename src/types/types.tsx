export interface IProduct {
  id: string;
  product: string;
  brand: string | null;
  price: number;
}

export interface ApiResponse<T> {
  result: T;
}

export interface SearchQuery<T> {
  query: string;
  filter: T | null;
}
