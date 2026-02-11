export type Product = {
  id: number;
  title: string;
  brand: string;
  sku: string;
  rating: number;
  price: number;
  stock: number;
  thumbnail: string;
  category: string;
};

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type LoginParams = {
  username: string;
  password: string;
  remember: boolean;
};

export type AuthResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  accessToken: string;
  refreshToken: string;
  image: string;
};

export type SortField = "title" | "price" | "rating" | "stock";
export type SortOrder = "asc" | "desc";

export type GetProductsParams = {
  limit?: number;
  skip?: number;
  sortBy?: SortField;
  order?: SortOrder;
};
