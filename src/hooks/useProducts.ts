import { useQuery } from "@tanstack/react-query";
import type { SortingState } from "@tanstack/react-table";
import type { GetProductsParams } from "../api/products";
import { getProducts, searchProducts } from "../api/products";
import { queryKeys } from "../api/queryKeys";
import type { SortField, SortOrder } from "../types";

const ITEMS_PER_PAGE = 10;

function sortingStateToApi(sorting: SortingState): {
  sortBy?: SortField;
  order?: SortOrder;
} {
  if (sorting.length === 0) return {};
  const { id, desc } = sorting[0];
  return { sortBy: id as SortField, order: desc ? "desc" : "asc" };
}

export function useProducts(params: {
  page: number;
  query: string;
  sorting: SortingState;
}) {
  const { page, query, sorting } = params;

  const apiParams: GetProductsParams = {
    limit: ITEMS_PER_PAGE,
    skip: (page - 1) * ITEMS_PER_PAGE,
    ...sortingStateToApi(sorting),
  };

  return useQuery({
    queryKey: queryKeys.product.list(apiParams),
    queryFn: () =>
      query ? searchProducts(query, apiParams) : getProducts(apiParams),
  });
}
