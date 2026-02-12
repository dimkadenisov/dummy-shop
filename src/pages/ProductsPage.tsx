import { useQueryClient } from "@tanstack/react-query";
import type { SortingState } from "@tanstack/react-table";
import { useCallback, useState } from "react";
import type { Product, ProductsResponse } from "../api/types";
import { RefreshIcon } from "../assets/RefreshIcon";
import { AddProductModal } from "../components/AddProductModal";
import { LogoutButton } from "../components/LogoutButton";
import { ProductsSearchBar } from "../components/ProductsSearchBar";
import { ProductTable } from "../components/ProductTable";
import { ProgressBar } from "../components/ProgressBar";
import { Toast } from "../components/Toast";
import { Pagination, usePagination } from "../components/ui/Pagination";
import { useProducts } from "../hooks/useProducts";

export default function ProductsPage() {
  const queryClient = useQueryClient();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [toastMsg, setToastMsg] = useState("");
  const { page, setPage, resetPage, itemsPerPage } = usePagination();

  const { data, isPending, isFetching, refetch } = useProducts({
    page,
    sorting,
  });

  const handleSortingChange = useCallback(
    (next: SortingState) => {
      setSorting(next);
      resetPage();
    },
    [resetPage],
  );

  const handleAddProduct = useCallback(
    (
      product: Omit<
        Product,
        "id" | "rating" | "stock" | "thumbnail" | "category"
      >,
    ) => {
      const newProduct: Product = {
        ...product,
        id: Date.now(),
        rating: 0,
        stock: 0,
        thumbnail: "",
        category: "",
      };
      queryClient.setQueryData<ProductsResponse>(
        ["products", { page, sorting }],
        (old) =>
          old
            ? {
                ...old,
                products: [newProduct, ...old.products],
                total: old.total + 1,
              }
            : {
                products: [newProduct],
                total: 1,
                skip: 0,
                limit: itemsPerPage,
              },
      );
      setToastMsg("Товар добавлен");
    },
    [queryClient, page, sorting, itemsPerPage],
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <ProgressBar loading={isPending} />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center gap-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 shrink-0">Товары</h1>
          <ProductsSearchBar />
          <LogoutButton />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <span className="font-semibold text-gray-900">Все позиции</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => refetch()}
                disabled={isPending}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-50"
              >
                <RefreshIcon
                  className={`w-5 h-5 ${isFetching ? "animate-spin" : ""}`}
                />
              </button>
              <AddProductModal onAdd={handleAddProduct} />
            </div>
          </div>

          <ProductTable
            products={data?.products ?? []}
            sorting={sorting}
            onSortingChange={handleSortingChange}
            loading={isPending}
          />

          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={data?.total}
            page={page}
            setPage={setPage}
          />
        </div>
      </div>

      <Toast message={toastMsg} onClose={() => setToastMsg("")} />
    </div>
  );
}
