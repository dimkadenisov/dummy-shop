import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { SortingState } from "@tanstack/react-table";
import type { Product } from "../types";
import DataTable from "./ui/DataTable";

const col = createColumnHelper<Product>();

const columns = [
  col.display({
    id: "checkbox",
    meta: { narrow: true },
    header: () => <input type="checkbox" className="rounded border-gray-300" />,
    cell: () => <input type="checkbox" className="rounded border-gray-300" />,
  }),
  col.accessor("title", {
    header: "Наименование",
    cell: (info) => (
      <div className="flex items-center gap-3">
        <img
          src={info.row.original.thumbnail}
          alt={info.getValue()}
          className="w-10 h-10 rounded-lg object-cover"
        />
        <span className="text-sm font-medium text-gray-900">
          {info.getValue()}
        </span>
      </div>
    ),
  }),
  col.accessor("brand", {
    header: "Вендор",
    enableSorting: false,
    cell: (info) => (
      <span className="text-sm text-gray-600">{info.getValue() || "—"}</span>
    ),
  }),
  col.accessor("sku", {
    header: "Артикул",
    enableSorting: false,
    cell: (info) => (
      <span className="text-sm text-gray-600">{info.getValue() || "—"}</span>
    ),
  }),
  col.accessor("rating", {
    header: "Рейтинг",
    cell: (info) => {
      const ratingValue = info.getValue();
      return (
        <span className={`text-sm font-medium`}>
          <span
            className={`${ratingValue < 3 ? "text-red-500" : "text-gray-900"}`}
          >
            {ratingValue}
          </span>
          <span>/5</span>
        </span>
      );
    },
  }),
  col.accessor("price", {
    header: "Цена $",
    cell: (info) => (
      <span className="text-sm text-gray-900">
        ${info.getValue().toFixed(2)}
      </span>
    ),
  }),
  col.accessor("stock", {
    header: "Количество",
    cell: (info) => (
      <span className="text-sm text-gray-600">{info.getValue()}</span>
    ),
  }),
];

type Props = {
  products: Product[];
  sorting: SortingState;
  onSortingChange: (sorting: SortingState) => void;
  loading?: boolean;
};

export default function ProductTable({
  products,
  sorting,
  onSortingChange,
  loading,
}: Props) {
  const table = useReactTable({
    data: products,
    columns,
    state: { sorting },
    onSortingChange: (updater) => {
      const next = typeof updater === "function" ? updater(sorting) : updater;
      onSortingChange(next);
    },
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
  });

  return (
    <DataTable table={table} isLoading={loading} emptyState="Нет товаров" />
  );
}
