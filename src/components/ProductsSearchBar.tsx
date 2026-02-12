import { useMemo, useState } from "react";
import type { Product } from "../api/types";
import { SearchIcon } from "../assets/SearchIcon";
import { useSearchProducts } from "../hooks/useSearchProducts";
import { Combobox, type ComboboxItem } from "./ui/Combobox";

type ProductItem = ComboboxItem & { product: Product };

const SUGGESTIONS_LIMIT = 5;

export function ProductsSearchBar() {
  const [query, setQuery] = useState("");
  const { data } = useSearchProducts(query, { limit: SUGGESTIONS_LIMIT });

  const items: ProductItem[] = useMemo(
    () =>
      (data?.products ?? []).map((p) => ({
        value: p.id,
        label: p.title,
        product: p,
      })),
    [data],
  );

  return (
    <Combobox
      items={items}
      // В реальном продукте будут реальные хендлеры.
      onSelect={() => {}}
      // В реальном продукте будут реальные хендлеры.
      onSubmit={() => {}}
      onChange={setQuery}
      placeholder="Найти"
      icon={<SearchIcon width="16" height="16" />}
      renderItem={(item) => (
        <div className="flex items-center gap-3">
          {item.product.thumbnail && (
            <img
              src={item.product.thumbnail}
              alt={item.product.title}
              className="w-10 h-10 rounded object-cover shrink-0"
            />
          )}
          <div className="min-w-0 flex-1">
            <div className="font-medium truncate">{item.product.title}</div>
            <div className="text-xs text-gray-500 truncate">
              {item.product.brand} · {item.product.category} · SKU:{" "}
              {item.product.sku}
            </div>
            <div className="text-xs text-gray-500">
              ${item.product.price} · ★ {item.product.rating} ·{" "}
              {item.product.stock} in stock
            </div>
          </div>
        </div>
      )}
    />
  );
}
