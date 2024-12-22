import {
  SET_CART,
  SET_PAYMENT,
  SET_ADDRESS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM,
  TOGGLE_CART_ITEM,
  LOAD_CART_FROM_STORAGE,
  CLEAR_CART,
} from "../actions/shoppingCartActions";

const initialState = {
  cart: [],
  payment: {},
  address: null,
};

const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CART_FROM_STORAGE:
      return {
        ...state,
        cart: action.payload,
      };

    case SET_CART:
      return { ...state, cart: action.payload };

    case SET_PAYMENT:
      return { ...state, payment: action.payload };

    case SET_ADDRESS:
      return { ...state, address: action.payload };

    case ADD_TO_CART: {
      const existingItem = state.cart.find(
        (item) => item.product.id === action.payload.id
      );

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.product.id === action.payload.id
              ? { ...item, count: item.count + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        cart: [
          ...state.cart,
          { product: action.payload, count: 1, checked: true },
        ],
      };
    }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.product.id !== action.payload),
      };

    case UPDATE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === action.payload.productId
            ? { ...item, count: action.payload.count }
            : item
        ),
      };

    case TOGGLE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === action.payload
            ? { ...item, checked: !item.checked }
            : item
        ),
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};

export default shoppingCartReducer;
