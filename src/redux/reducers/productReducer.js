import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
} from "../actions/productActionTypes";

const initialState = {
  loading: false,
  categories: [],
  productList: [],
  currentProduct: null, // Add this for single product view
  total: 0,
  limit: 25,
  offset: 0,
  filter: "",
  fetchState: "NOT_FETCHED",
  error: "",
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        total: action.payload.total,
        currentProduct:
          action.payload.total === 1 ? action.payload.products[0] : null,
        error: "",
      };
    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        products: [],
        currentProduct: null,
        total: 0,
        error: action.payload,
      };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_PRODUCT_LIST":
      return { ...state, productList: action.payload };
    case "SET_TOTAL":
      return { ...state, total: action.payload };
    case "SET_FETCH_STATE":
      return { ...state, fetchState: action.payload };
    case "SET_LIMIT":
      return { ...state, limit: action.payload };
    case "SET_OFFSET":
      return { ...state, offset: action.payload };
    case "SET_FILTER":
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};

export default productReducer;
