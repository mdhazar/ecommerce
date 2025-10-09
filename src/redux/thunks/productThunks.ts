import type { Dispatch } from "redux";
import api from "../../api/api";
import {
	fetchProductsFailure,
	fetchProductsRequest,
	fetchProductsSuccess,
} from "../actions/productActions";

interface ProductParams {
	limit?: number;
	offset?: number;
	filter?: string;
	sort?: string;
	[key: string]: any;
}

export const fetchProducts = (params: ProductParams) => {
	return async (dispatch: Dispatch) => {
		dispatch(fetchProductsRequest());
		try {
			const response = await api.get("/products", {
				params,
			});
			const { products, total } = response.data;

			dispatch(fetchProductsSuccess(products, total));
		} catch (error) {
			dispatch(
				fetchProductsFailure(
					error instanceof Error ? error.message : "Something went wrong",
				),
			);
		}
	};
};

export const fetchProduct = (productId: string | number) => {
	return async (dispatch: Dispatch) => {
		dispatch(fetchProductsRequest());
		try {
			const response = await api.get(`/products/${productId}`);
			dispatch(fetchProductsSuccess([response.data], 1));
		} catch (error) {
			dispatch(
				fetchProductsFailure(
					error instanceof Error ? error.message : "Failed to fetch product",
				),
			);
		}
	};
};
