import { toast } from "react-toastify";
import type { Dispatch } from "redux";
import api from "../../api/api";
import { setCategories } from "../actions/categoryActions";
import type { Category } from "../types";

export const fetchCategories = () => {
	return async (dispatch: Dispatch) => {
		try {
			const response = await api.get("/categories");
			const categories: Category[] = response.data;

			dispatch(setCategories(categories));
		} catch (error) {
			console.error("Error fetching categories:", error);
			toast.error("Failed to fetch categories. Please try again later.");
		}
	};
};
