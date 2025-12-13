import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);

  // IDs from local API are strings (_id), so compare as strings
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="p-3 sm:p-4 md:p-6 text-center">
        <h1 className="text-xl md:text-2xl font-bold text-red-600">Product Not Found</h1>
        <button
          onClick={() => navigate("/products")}
          className="mt-4 bg-blue-600 text-white px-4 md:px-6 py-2 rounded hover:bg-blue-700 text-sm md:text-base"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    alert("Product added to cart!");
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 max-w-6xl mx-auto">
      <button
        onClick={() => navigate("/products")}
        className="mb-4 md:mb-6 text-blue-600 hover:underline text-sm md:text-base"
      >
        ← Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 bg-white p-4 md:p-8 rounded shadow">
        {/* Product Image */}
        <div className="flex justify-center items-start">
          <div className="bg-gray-100 p-3 md:p-6 rounded">
            <img
              src={product.image || "https://via.placeholder.com/400?text=No+Image"}
              alt={product.title}
              className="h-40 md:h-80 w-40 md:w-80 object-contain"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/400?text=Image+Not+Found";
              }}
            />
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">{product.title}</h1>

          <div className="flex items-center gap-2 md:gap-4 mb-4 md:mb-6">
            <div className="flex items-center">
              <span className="text-yellow-400 text-sm md:text-base">★★★★★</span>
              <span className="text-gray-600 ml-2 text-xs md:text-sm">(150 reviews)</span>
            </div>
          </div>

          <div className="mb-4 md:mb-6">
            <p className="text-gray-600 text-sm md:text-base mb-4">{product.description}</p>
          </div>

          <div className="mb-4 md:mb-6 pb-4 md:pb-6 border-b">
            <p className="text-gray-600 text-xs md:text-sm">Category</p>
            <p className="text-base md:text-lg font-semibold capitalize">{product.category}</p>
          </div>

          <div className="mb-4 md:mb-6 pb-4 md:pb-6 border-b">
            <p className="text-gray-600 text-xs md:text-sm">Price</p>
            <p className="text-3xl md:text-4xl font-bold text-green-600">${product.price}</p>
          </div>

          <div className="mb-4 md:mb-6 pb-4 md:pb-6 border-b">
            <p className="text-gray-600 text-xs md:text-sm mb-2">Stock Status</p>
            <p className="text-base md:text-lg font-semibold text-green-600">✓ In Stock</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 md:gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 text-white py-2 md:py-3 px-4 md:px-6 rounded font-semibold hover:bg-blue-700 transition text-sm md:text-base"
            >
              🛒 Add to Cart
            </button>
            <button className="flex-1 border-2 border-blue-600 text-blue-600 py-2 md:py-3 px-4 md:px-6 rounded font-semibold hover:bg-blue-50 transition text-sm md:text-base">
              ❤️ Add to Wishlist
            </button>
          </div>

          <div className="mt-4 md:mt-6 p-3 md:p-4 bg-gray-50 rounded">
            <h3 className="font-semibold mb-2 md:mb-3 text-sm md:text-base">Product Information</h3>
            <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-gray-700">
              <li>✓ Free shipping on orders over $50</li>
              <li>✓ 30-day money back guarantee</li>
              <li>✓ Secure checkout</li>
              <li>✓ 24/7 Customer support</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div className="bg-white p-4 md:p-6 rounded shadow">
          <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Description</h3>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            {product.description}
          </p>
        </div>

        <div className="bg-white p-4 md:p-6 rounded shadow">
          <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Specifications</h3>
          <ul className="space-y-2 md:space-y-3 text-gray-600 text-sm md:text-base">
            <li>
              <strong>Product ID:</strong> #{product.id}
            </li>
            <li>
              <strong>Category:</strong> {product.category}
            </li>
            <li>
              <strong>Price:</strong> ${product.price}
            </li>
            <li>
              <strong>Rating:</strong> 4.5/5 (150 reviews)
            </li>
            <li>
              <strong>Availability:</strong> In Stock
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
