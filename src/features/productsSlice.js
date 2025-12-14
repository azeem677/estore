import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    // Use VITE_API_URL when provided at build time, otherwise default to same origin
    // Set VITE_API_URL in your environment for production (e.g. https://api.example.com)
    const API_BASE = import.meta.env.VITE_API_URL || "";

    // Build product list URL
    const productsUrl = `${API_BASE}/api/products`;
    const res = await axios.get(productsUrl);

    // Transform API response to match app structure (local API returns _id, name, picture)
    const transformedData = res.data.map((product) => ({
      id: product._id,
      title: product.name,
      price: product.price,
      // If backend returns a relative picture path, prefix with API_BASE; if it's already absolute, use it as-is
      image: product.picture
        ? product.picture.startsWith("http")
          ? product.picture
          : `${API_BASE}/${product.picture}`
        : null,
      category: product.category || "uncategorized",
      description: product.description || product.name,
    }));

    return transformedData;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load products";
      });
  },
});

export default productsSlice.reducer;
