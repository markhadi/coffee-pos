import { Product } from "@prisma/client";

export type ProductResponse = Product;

export type CreateProductRequest = {
  code: string;
  name: string;
  stock: number;
  price: number;
  category_id: number;
};

export type SearchProductRequest = {
  search?: string;
  size?: number;
  cursor?: number;
};
