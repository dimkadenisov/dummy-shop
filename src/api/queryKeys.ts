import type { GetProductsParams } from "./types";

export const queryKeys = {
  auth: {
    me: () => ["auth", "me"],
  },
  product: {
    list: (requestConfig?: GetProductsParams) => [
      "product",
      "list",
      requestConfig,
    ],
  },
} as const;
