import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-6 fixed">
      <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>

      <nav className="space-y-4">
        <Link
          to="/dashboard"
          className={`block p-3 rounded ${
            isActive("/dashboard")
              ? "bg-blue-600"
              : "hover:bg-gray-800"
          }`}
        >
          📊 Dashboard
        </Link>

        <Link
          to="/dashboard/add-product"
          className={`block p-3 rounded ${
            isActive("/dashboard/add-product")
              ? "bg-blue-600"
              : "hover:bg-gray-800"
          }`}
        >
          ➕ Add Product
        </Link>

        <Link
          to="/dashboard/orders"
          className={`block p-3 rounded ${
            isActive("/dashboard/orders")
              ? "bg-blue-600"
              : "hover:bg-gray-800"
          }`}
        >
          📦 Orders
        </Link>

        <Link
          to="/dashboard/users"
          className={`block p-3 rounded ${
            isActive("/dashboard/users")
              ? "bg-blue-600"
              : "hover:bg-gray-800"
          }`}
        >
          👥 Users
        </Link>

        <Link
          to="/"
          className="block p-3 rounded hover:bg-gray-800 mt-8 border-t border-gray-700 pt-6"
        >
          🏠 Back to Home
        </Link>
      </nav>
    </div>
  );
}
