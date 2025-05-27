// Common Types
export interface User {
  email: string;
  token?: string;
  gravatarUrl?: string;
  [key: string]: any;
}

export interface Product {
  id: string | number;
  name: string;
  price: number;
  description: string;
  stock: number;
  sell_count: number;
  rating: number;
  images: ProductImage[];
  [key: string]: any;
}

export interface ProductImage {
  url: string;
}

export interface Category {
  id: string | number;
  name: string;
  gender: string;
  code: string;
  title: string;
  [key: string]: any;
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
  addressList: any[];
  creditCards: any[];
  roles: string[];
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
  fetchState: string;
  error: string;
}

export interface FilterState {
  filter: string;
  sort: string;
}

export interface ShoppingCartState {
  cart: CartItem[];
  payment: Record<string, any>;
  address: any | null;
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

export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface History {
  replace: (path: string) => void;
}

export interface Location {
  state?: {
    from: {
      pathname: string;
    };
  };
}
