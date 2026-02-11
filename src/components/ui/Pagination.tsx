type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const MAX_VISIBLE = 5;

function getPageRange(page: number, totalPages: number): number[] {
  const half = Math.floor(MAX_VISIBLE / 2);
  let start = Math.max(1, page - half);
  const end = Math.min(totalPages, start + MAX_VISIBLE - 1);
  start = Math.max(1, end - MAX_VISIBLE + 1);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  const pages = getPageRange(page, totalPages);

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-2 py-1 text-sm rounded text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:pointer-events-none"
      >
        &lt;
      </button>
      {pages.map((p) => (
        <button
          type="button"
          key={p}
          onClick={() => onPageChange(p)}
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
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-2 py-1 text-sm rounded text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:pointer-events-none"
      >
        &gt;
      </button>
    </div>
  );
}
