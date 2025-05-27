import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
} from "./productActionTypes";
import { Category, Product } from "../types";

export const setCategories = (categories: Category[]) => ({
  type: "SET_CATEGORIES",
  payload: categories,
});

export const setProductList = (productList: Product[]) => ({
  type: "SET_PRODUCT_LIST",
  payload: productList,
});

export const setTotal = (total: number) => ({
  type: "SET_TOTAL",
  payload: total,
});

export const setFetchState = (fetchState: string) => ({
  type: "SET_FETCH_STATE",
  payload: fetchState,
});

export const setLimit = (limit: number) => ({
  type: "SET_LIMIT",
  payload: limit,
});

export const setOffset = (offset: number) => ({
  type: "SET_OFFSET",
  payload: offset,
});

export const setFilter = (filter: string) => ({
  type: "SET_FILTER",
  payload: filter,
});

export const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (products: Product[], total: number) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { products, total },
});

export const fetchProductsFailure = (error: string) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});
