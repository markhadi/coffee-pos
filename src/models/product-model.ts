import { Product } from "@prisma/client";
import { CategoryResponse } from "./category-model";

export type ProductResponse = Product;
export type ProductResponseCategoryIncluded = Product & {
  category: CategoryResponse;
};

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

export type UpdateProductRequest = CreateProductRequest & {
  id: number;
};
