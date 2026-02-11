import { useCallback, useMemo, useState } from "react";

type Props = {
  page: number;
  setPage: (page: number) => void;
  totalItems: number | undefined;
  itemsPerPage?: number;
};

const MAX_VISIBLE = 5;
const DEFAULT_ITEMS_PER_PAGE = 10;

function getPageRange(page: number, totalPages: number): number[] {
  const half = Math.floor(MAX_VISIBLE / 2);
  let start = Math.max(1, page - half);
  const end = Math.min(totalPages, start + MAX_VISIBLE - 1);
  start = Math.max(1, end - MAX_VISIBLE + 1);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function Pagination({
  page,
  setPage,
  totalItems,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
}: Props) {
  if (!totalItems) {
    return null;
  }

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const showFrom = totalItems === 0 ? 0 : (page - 1) * itemsPerPage + 1;
  const showTo = Math.min(page * itemsPerPage, totalItems);
  const pages = getPageRange(page, totalPages);

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
      <span className="text-sm text-gray-500">
        Показано {showFrom}-{showTo} из {totalItems}
      </span>

      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-2 py-1 text-sm rounded text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:pointer-events-none"
          >
            &lt;
          </button>
          {pages.map((p) => (
            <button
              type="button"
              key={p}
              onClick={() => setPage(p)}
              className={`px-2 py-1 text-sm rounded border border-gray-300 ${
                p === page
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="px-2 py-1 text-sm rounded text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:pointer-events-none"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}

export function usePagination(itemsPerPage = DEFAULT_ITEMS_PER_PAGE) {
  const [page, setPage] = useState(1);
  const resetPage = useCallback(() => setPage(1), []);

  return useMemo(
    () => ({
      page,
      setPage,
      resetPage,
      itemsPerPage,
    }),
    [page, resetPage, itemsPerPage],
  );
}
