import { get } from "./client";
import type { GetProductsParams, ProductsResponse } from "./types";

export async function getProducts(
  params: GetProductsParams = {},
): Promise<ProductsResponse> {
  return get<ProductsResponse>("/products", params);
}

export async function searchProducts(
  q: string,
  params: GetProductsParams = {},
): Promise<ProductsResponse> {
  return get<ProductsResponse>("/products/search", { q, ...params });
}
