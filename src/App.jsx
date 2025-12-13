import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./pages/AdminLogin";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import AdminHome from "./pages/Dashboard/AdminHome";
import AddProduct from "./pages/Dashboard/AddProduct";
import Orders from "./pages/Dashboard/Orders";
import Users from "./pages/Dashboard/Users";

export default function App() {
  return (
    <Router>
      {/* Global navbar rendered on all routes */}
      <Navbar />

      <Routes>
        {/* Admin Login Route */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Public site routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/add-product"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />

        {/* Unprotected test route */}
        <Route path="/dashboard/test" element={<AdminHome />} />

        {/* Catch-all client-side 404 page */}
        <Route path="*" element={<div className="p-6">Page not found (client-side). <a href="#/">Go home</a></div>} />
      </Routes>
    </Router>
  );
}
