import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import logger from "redux-logger";
import categoryReducer from "./reducers/categoryReducer";
import clientReducer from "./reducers/clientReducer";
import filterReducer from "./reducers/filterReducer";
import productReducer from "./reducers/productReducer";
import shoppingCartReducer from "./reducers/shoppingCartReducer";
import type { RootState } from "./types";

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
