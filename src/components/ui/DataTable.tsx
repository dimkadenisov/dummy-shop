import { flexRender, type Table } from "@tanstack/react-table";
import type { ReactNode } from "react";

type DataTableProps<TData> = {
  table: Table<TData>;
  isLoading?: boolean;
  emptyState?: ReactNode;
};

export default function DataTable<TData>({
  table,
  isLoading,
  emptyState = "Нет данных",
}: DataTableProps<TData>) {
  const rows = table.getRowModel().rows;
  const colCount = table.getAllColumns().length;

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id} className="bg-gray-50 border-b border-gray-200">
              {hg.headers.map((header) => {
                const sortable = header.column.getCanSort();
                const sorted = header.column.getIsSorted();
                return (
                  <th
                    key={header.id}
                    onClick={
                      sortable
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                    className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                      header.column.columnDef.meta?.narrow ? "w-10" : ""
                    } ${sortable ? "cursor-pointer hover:text-gray-700 select-none" : ""}`}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {sortable &&
                      (sorted ? (
                        <span className="ml-1">
                          {sorted === "asc" ? "↑" : "↓"}
                        </span>
                      ) : (
                        <span className="text-gray-300 ml-1">↕</span>
                      ))}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
          {isLoading && rows.length === 0 && (
            <tr>
              <td
                colSpan={colCount}
                className="px-4 py-8 text-center text-gray-400 text-sm"
              >
                Загрузка...
              </td>
            </tr>
          )}
          {!isLoading && rows.length === 0 && (
            <tr>
              <td
                colSpan={colCount}
                className="px-4 py-8 text-center text-gray-400 text-sm"
              >
                {emptyState}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
