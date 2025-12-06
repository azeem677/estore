import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    stats: {
      totalProducts: 0,
      totalOrders: 0,
      totalUsers: 0,
      totalRevenue: 0,
    },
    recentOrders: [
      { id: 1001, customer: "Ahmed Khan", amount: "$120.50", status: "Delivered", date: "2024-12-01" },
      { id: 1002, customer: "Fatima Ali", amount: "$89.99", status: "Pending", date: "2024-12-02" },
      { id: 1003, customer: "Hassan Raza", amount: "$250.00", status: "Processing", date: "2024-12-03" },
    ],
  },
  reducers: {
    setStats: (state, action) => {
      state.stats = action.payload;
    },
    setRecentOrders: (state, action) => {
      state.recentOrders = action.payload;
    },
  },
});

export const { setStats, setRecentOrders } = dashboardSlice.actions;
export default dashboardSlice.reducer;
