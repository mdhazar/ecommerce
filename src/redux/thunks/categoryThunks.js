import api from "@/api/api";
import { setCategories } from "@/actions/categoryActions";
import { toast } from "react-toastify";

export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      const response = await api.get("/categories");
      const categories = response.data;

      dispatch(setCategories(categories));
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories. Please try again later.");
    }
  };
};
