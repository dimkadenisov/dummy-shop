import * as Checkbox from "@radix-ui/react-checkbox";
import type { RowSelectionState, SortingState } from "@tanstack/react-table";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import type { Product } from "../api/types";
import { CheckmarkIcon } from "../assets/CheckmarkIcon";
import { DataTable } from "./ui/DataTable";

const col = createColumnHelper<Product>();

const columns = [
  col.display({
    id: "checkbox",
    meta: { narrow: true },
    header: ({ table }) => {
      const allSelected = table.getIsAllRowsSelected();
      const someSelected = table.getIsSomeRowsSelected();
      return (
        <Checkbox.Root
          checked={someSelected ? "indeterminate" : allSelected}
          onCheckedChange={(v) => table.toggleAllRowsSelected(Boolean(v))}
          className="h-4 w-4 rounded border border-gray-300 flex items-center justify-center data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600 data-[state=indeterminate]:bg-indigo-600 data-[state=indeterminate]:border-indigo-600"
        >
          <Checkbox.Indicator>
            <CheckmarkIcon width="10" height="10" />
          </Checkbox.Indicator>
        </Checkbox.Root>
      );
    },
    cell: ({ row }) => (
      <Checkbox.Root
        checked={row.getIsSelected()}
        onCheckedChange={(v) => row.toggleSelected(Boolean(v))}
        className="h-4 w-4 rounded border border-gray-300 flex items-center justify-center data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
      >
        <Checkbox.Indicator>
          <CheckmarkIcon width="10" height="10" />
        </Checkbox.Indicator>
      </Checkbox.Root>
    ),
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

export function ProductTable({
  products,
  sorting,
  onSortingChange,
  loading,
}: Props) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data: products,
    columns,
    state: { sorting, rowSelection },
    onSortingChange: (updater) => {
      const next = typeof updater === "function" ? updater(sorting) : updater;
      onSortingChange(next);
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
  });

  return (
    <DataTable table={table} isLoading={loading} emptyState="Нет товаров" />
  );
}
