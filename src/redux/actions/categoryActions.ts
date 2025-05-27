import { Category } from "../types";

export const SET_CATEGORIES = "SET_CATEGORIES";

export const setCategories = (categories: Category[]) => ({
  type: SET_CATEGORIES,
  payload: categories,
});
