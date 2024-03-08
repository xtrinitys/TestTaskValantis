export interface IProduct {
  id: string;
  product: string;
  brand: string | null;
  price: number;
}

export interface SearchQuery<T> {
  query: string;
  filter: T | null;
}

export type ValueOf<T> = T[keyof T];
