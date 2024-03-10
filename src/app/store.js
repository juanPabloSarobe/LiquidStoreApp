import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { shopApi } from "./services/shop";
import cartReducer from "../features/cart/cartSlice";
import authSlice from "../features/cart/authSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authSlice,
    [shopApi.reducerPath]: shopApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopApi.middleware),
});

setupListeners(store.dispatch);
