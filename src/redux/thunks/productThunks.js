import api from "../../api/api";
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
} from "../actions/productActions";

export const fetchProducts = (offset = 0, limit = 12) => {
  return async (dispatch) => {
    dispatch(fetchProductsRequest());
    try {
      const response = await api.get("/products", {
        params: {
          limit,
          offset,
        },
      });
      const { products, total } = response.data;

      dispatch(fetchProductsSuccess(products, total));
    } catch (error) {
      dispatch(fetchProductsFailure(error.message || "Something went wrong"));
    }
  };
};
