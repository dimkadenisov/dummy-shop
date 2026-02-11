import { useQueryClient } from "@tanstack/react-query";
import type { SortingState } from "@tanstack/react-table";
import { useCallback, useState } from "react";
import type { Product, ProductsResponse } from "../api/types";
import RefreshIcon from "../assets/RefreshIcon";
import AddProductModal from "../components/AddProductModal";
import { LogoutButton } from "../components/LogoutButton";
import ProductTable from "../components/ProductTable";
import ProgressBar from "../components/ProgressBar";
import SearchBar from "../components/SearchBar";
import Toast from "../components/Toast";
import Pagination from "../components/ui/Pagination";
import { useProducts } from "../hooks/useProducts";

const ITEMS_PER_PAGE = 10;

export default function ProductsPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [toastMsg, setToastMsg] = useState("");

  const { data, isPending, isFetching, refetch } = useProducts({
    page,
    query,
    sorting,
  });

  const handleSearch = useCallback((q: string) => {
    setQuery(q);
    setPage(1);
  }, []);

  const handleSortingChange = useCallback((next: SortingState) => {
    setSorting(next);
    setPage(1);
  }, []);

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
        ["products", { page, query, sorting }],
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
                limit: ITEMS_PER_PAGE,
              },
      );
      setToastMsg("Товар добавлен");
    },
    [queryClient, page, query, sorting],
  );

  const totalPages = Math.ceil((data?.total ?? 0) / ITEMS_PER_PAGE);
  const showFrom =
    (data?.total ?? 0) === 0 ? 0 : (page - 1) * ITEMS_PER_PAGE + 1;
  const showTo = Math.min(page * ITEMS_PER_PAGE, data?.total ?? 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <ProgressBar loading={isPending} />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Товары</h1>
          <LogoutButton />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <SearchBar onSearch={handleSearch} />
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                Все позиции
              </span>
            </div>
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

          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
            <span className="text-sm text-gray-500">
              Показано {showFrom}-{showTo} из {data?.total}
            </span>
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>

      <Toast message={toastMsg} onClose={() => setToastMsg("")} />
    </div>
  );
}
