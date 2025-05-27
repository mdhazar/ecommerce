// Common Types
export interface User {
  id?: string;
  email: string;
  name?: string;
  gravatarUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  sell_count: number;
  rating: number;
  images: ProductImage[];
}

export interface ProductImage {
  url: string;
}

export interface Category {
  id: number;
  gender: string;
  code: string;
  title: string;
}

export interface CartItem {
  product: Product;
  count: number;
  checked: boolean;
}

export interface Address {
  id?: number;
  title: string;
  name: string;
  surname: string;
  phone: string;
  city: string;
  district: string;
  neighborhood: string;
  address: string;
}

// State Types
export interface ClientState {
  user: User;
  addressList: Address[];
  creditCards: any[]; // TODO: Define credit card type
  roles: any[]; // TODO: Define role type
  theme: string;
  language: string;
}

export interface ProductState {
  loading: boolean;
  categories: Category[];
  productList: Product[];
  currentProduct: Product | null;
  total: number;
  limit: number;
  offset: number;
  filter: string;
  fetchState: "NOT_FETCHED" | "FETCHING" | "FETCHED" | "ERROR";
  error: string;
}

export interface FilterState {
  filter: string;
  sort: string;
}

export interface ShoppingCartState {
  cart: CartItem[];
  payment: any; // TODO: Define payment type
  address: Address | null;
}

export interface CategoryState {
  categories: Category[];
}

// Root State Type
export interface RootState {
  client: ClientState;
  product: ProductState;
  filter: FilterState;
  shoppingCart: ShoppingCartState;
  category: CategoryState;
}

// Action Types
export type Action<T = any> = {
  type: string;
  payload: T;
};

// Thunk Types
export type ThunkAction<R, S, E, A extends Action> = (
  dispatch: ThunkDispatch<S, E, A>,
  getState: () => S,
  extraArgument: E
) => R;

export type ThunkDispatch<S, E, A extends Action> = (
  action: A | ThunkAction<any, S, E, A>
) => any;
