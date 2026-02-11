import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export function Button({
  variant = "primary",
  className = "",
  ...rest
}: Props) {
  const base =
    variant === "primary"
      ? "bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
      : "text-sm text-gray-600 hover:text-gray-800";

  return <button className={`${base} ${className}`} {...rest} />;
}
