import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { shopApi } from "./services/shop";
import cartReducer from "../features/cart/cartSlice";
import counterReducer from "../features/counter/counterSlice";
import { authApi } from "./services/auth";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    counter: counterReducer,
    [shopApi.reducerPath]: shopApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopApi.middleware, authApi.middleware),
});

setupListeners(store.dispatch);
