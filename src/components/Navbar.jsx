import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Navbar() {
  const count = useSelector((state) => state.cart.items.length);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-lg md:text-xl font-bold">Ecommerce</Link>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-2xl"
      >
        ☰
      </button>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        <Link to="/products" className="hover:underline">Products</Link>
        <Link to="/cart" className="hover:underline">Cart ({count})</Link>
        <Link
          to="/admin-login"
          className="ml-2 bg-white text-black px-3 py-1 rounded hover:opacity-90 text-sm"
        >
          Admin Login
        </Link>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-blue-600 p-4 md:hidden flex flex-col gap-4">
          <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart ({count})</Link>
          <Link to="/admin-login" onClick={() => setMenuOpen(false)} className="mt-2 bg-white text-black px-3 py-1 rounded w-max">Admin Login</Link>
        </div>
      )}
    </nav>
  );
}
