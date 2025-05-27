import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import filterReducer from "./reducers/filterReducer";
import clientReducer from "./reducers/clientReducer";
import categoryReducer from "./reducers/categoryReducer";
import { RootState } from "./types";
import productReducer from "./reducers/productReducer";
import shoppingCartReducer from "./reducers/shoppingCartReducer";

const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
  filter: filterReducer,
  shoppingCart: shoppingCartReducer,
  category: categoryReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type AppDispatch = typeof store.dispatch;
export type { RootState };
export default store;
