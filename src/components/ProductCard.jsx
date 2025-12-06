import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="border p-2 md:p-4 rounded shadow text-center hover:shadow-lg transition">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image || "https://via.placeholder.com/300?text=No+Image"}
          alt={product.title}
          className="h-24 md:h-40 mx-auto cursor-pointer hover:scale-105 transition object-contain"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300?text=Image+Not+Found";
          }}
        />
        <h2 className="font-bold mt-2 line-clamp-2 hover:text-blue-600 text-xs md:text-sm">{product.title}</h2>
      </Link>
      <p className="text-green-600 font-semibold text-sm md:text-base mt-1">${product.price}</p>

      <div className="flex flex-col sm:flex-row gap-1 md:gap-2 mt-2 md:mt-3">
        <Link
          to={`/product/${product.id}`}
          className="flex-1 bg-gray-600 text-white py-1 md:py-2 rounded hover:bg-gray-700 text-xs md:text-sm"
        >
          Details
        </Link>
        <button
          onClick={() => dispatch(addToCart(product))}
          className="flex-1 bg-blue-600 text-white py-1 md:py-2 rounded hover:bg-blue-700 text-xs md:text-sm"
        >
          Cart
        </button>
      </div>
    </div>
  );
}
