import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { shopApi } from "./services/shop";
import cartReducer from "../features/cart/cartSlice";
import authReducer from "../features/auth/authSlice";
import colorsReducer from "../features/colors/colorsSlice";
import { authApi } from "./services/auth";
import { profileApi } from "./services/profile";

export const store = configureStore({
  reducer: {
    cart: cartReducer,

    auth: authReducer,
    colors: colorsReducer,
    [shopApi.reducerPath]: shopApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      shopApi.middleware,
      authApi.middleware,
      profileApi.middleware
    ),
});

setupListeners(store.dispatch);
