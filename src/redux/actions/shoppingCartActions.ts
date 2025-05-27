import { Product, CartItem } from "../types";
import { Dispatch } from "redux";

export const SET_CART = "SET_CART";
export const SET_PAYMENT = "SET_PAYMENT";
export const SET_ADDRESS = "SET_ADDRESS";
export const LOAD_CART_FROM_STORAGE = "LOAD_CART_FROM_STORAGE";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_CART_ITEM = "UPDATE_CART_ITEM";
export const TOGGLE_CART_ITEM = "TOGGLE_CART_ITEM";
export const CLEAR_CART = "CLEAR_CART";

export const loadCartFromStorage = () => {
  const savedCart = localStorage.getItem("cart");
  return {
    type: LOAD_CART_FROM_STORAGE,
    payload: savedCart ? JSON.parse(savedCart) : [],
  };
};

export const setCart = (cart: CartItem[]) => ({
  type: SET_CART,
  payload: cart,
});

export const setPayment = (payment: Record<string, any>) => ({
  type: SET_PAYMENT,
  payload: payment,
});

export const setAddress = (address: any) => ({
  type: SET_ADDRESS,
  payload: address,
});

export const addToCart =
  (product: Product) => (dispatch: Dispatch, getState: () => any) => {
    dispatch({
      type: ADD_TO_CART,
      payload: product,
    });
    const updatedCart = getState().shoppingCart.cart;
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

export const removeFromCart =
  (productId: string | number) => (dispatch: Dispatch, getState: () => any) => {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: productId,
    });

    const updatedCart = getState().shoppingCart.cart;
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

export const updateCartItem =
  (productId: string | number, count: number) =>
  (dispatch: Dispatch, getState: () => any) => {
    dispatch({
      type: UPDATE_CART_ITEM,
      payload: { productId, count },
    });

    const updatedCart = getState().shoppingCart.cart;
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

export const clearCart = () => ({
  type: CLEAR_CART,
});

export const toggleCartItem =
  (productId: string | number) => (dispatch: Dispatch, getState: () => any) => {
    dispatch({
      type: TOGGLE_CART_ITEM,
      payload: productId,
    });

    const updatedCart = getState().shoppingCart.cart;
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
