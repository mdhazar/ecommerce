import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
} from "./productActionTypes";

export const setCategories = (categories) => ({
  type: "SET_CATEGORIES",
  payload: categories,
});

export const setProductList = (productList) => ({
  type: "SET_PRODUCT_LIST",
  payload: productList,
});

export const setTotal = (total) => ({
  type: "SET_TOTAL",
  payload: total,
});

export const setFetchState = (fetchState) => ({
  type: "SET_FETCH_STATE",
  payload: fetchState,
});

export const setLimit = (limit) => ({
  type: "SET_LIMIT",
  payload: limit,
});

export const setOffset = (offset) => ({
  type: "SET_OFFSET",
  payload: offset,
});

export const setFilter = (filter) => ({
  type: "SET_FILTER",
  payload: filter,
});
export const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (products, total) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { products, total },
});

export const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});
