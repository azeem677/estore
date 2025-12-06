import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/productsSlice";
import cartReducer from "../features/cartSlice";
import dashboardReducer from "../features/dashboardSlice";
import authReducer from "../features/authSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    dashboard: dashboardReducer,
    auth: authReducer,
  },
});

export default store;
