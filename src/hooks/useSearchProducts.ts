import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../api/products";
import { queryKeys } from "../api/queryKeys";
import type { GetProductsParams } from "../api/types";

export function useSearchProducts(query: string, params?: GetProductsParams) {
  return useQuery({
    queryKey: queryKeys.product.search(query),
    queryFn: () => searchProducts(query, params),
    enabled: query.length > 0,
  });
}
