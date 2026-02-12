import * as Popover from "@radix-ui/react-popover";
import { type ReactNode, useEffect, useRef, useState } from "react";

export type ComboboxItem = {
  label: string;
  value: string | number;
};

type Props<T extends ComboboxItem> = {
  items: T[];
  onSelect: (item: T) => void;
  onSubmit: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  onChange: (value: string) => void;
  renderItem: (item: T, active: boolean) => ReactNode;
  icon?: ReactNode;
  emptyMessage?: string;
};

export function Combobox<T extends ComboboxItem>({
  items,
  onSelect,
  onSubmit,
  placeholder,
  debounceMs = 300,
  onChange,
  renderItem,
  icon,
  emptyMessage = "Ничего не найдено",
}: Props<T>) {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => onChange(value), debounceMs);
    return () => clearTimeout(timer);
  }, [value, debounceMs, onChange]);

  useEffect(() => {
    setOpen(value.length > 0);
    setActiveIndex(-1);
  }, [value]);

  function select(item: T) {
    setValue(item.label);
    onSelect(item);
    setOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) {
      if (e.key === "Enter") onSubmit(value);
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => (i < items.length - 1 ? i + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => (i > 0 ? i - 1 : items.length - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0) {
          select(items[activeIndex]);
        } else {
          onSubmit(value);
          setOpen(false);
        }
        break;
      case "Escape":
        setOpen(false);
        break;
    }
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Anchor asChild>
        <div className="relative flex-1">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </span>
          )}
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            role="combobox"
            aria-expanded={open}
            aria-autocomplete="list"
            aria-activedescendant={
              activeIndex >= 0 ? `combobox-item-${activeIndex}` : undefined
            }
            className={`w-full pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${icon ? "pl-9" : "pl-3"}`}
          />
        </div>
      </Popover.Anchor>

      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={4}
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="w-(--radix-popover-trigger-width) bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden z-50"
        >
          {items.length === 0 ? (
            <div className="px-3 py-4 text-sm text-gray-500 text-center">
              {emptyMessage}
            </div>
          ) : (
            <ul>
              {items.map((item, index) => (
                <li
                  key={item.value}
                  id={String(item.value)}
                  onMouseDown={() => select(item)}
                  className={`px-3 py-2 cursor-pointer text-sm ${
                    index === activeIndex
                      ? "bg-indigo-50 text-indigo-900"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {renderItem(item, index === activeIndex)}
                </li>
              ))}
            </ul>
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
