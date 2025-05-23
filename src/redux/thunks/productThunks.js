import api from "@/api/api";
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
} from "@/actions/productActions";

export const fetchProducts = (params) => {
  return async (dispatch) => {
    dispatch(fetchProductsRequest());
    try {
      const response = await api.get("/products", {
        params,
      });
      const { products, total } = response.data;

      dispatch(fetchProductsSuccess(products, total));
    } catch (error) {
      dispatch(fetchProductsFailure(error.message || "Something went wrong"));
    }
  };
};

export const fetchProduct = (productId) => {
  return async (dispatch) => {
    dispatch(fetchProductsRequest());
    try {
      const response = await api.get(`/products/${productId}`);
      dispatch(fetchProductsSuccess([response.data], 1));
    } catch (error) {
      dispatch(
        fetchProductsFailure(error.message || "Failed to fetch product"),
      );
    }
  };
};
