import { useDispatch, useSelector } from "react-redux";
import { increaseQty, decreaseQty, removeFromCart } from "../features/cartSlice";
import { useState } from "react";
import axios from "axios";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    zip: "",
    phone: "",
  });

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handleCheckout = async () => {
    if (items.length === 0) {
      alert("Cart is empty!");
      return;
    }

    // Check if address is complete
    for (let key in address) {
      if (!address[key]) {
        alert("Please fill all address fields!");
        return;
      }
    }

    setLoading(true);

    const dataToSend = {
      items: items.map((item) => ({
        name: item.title,
        price: item.price,
        picture: item.image,
        color: item.color || "N/A",
        quantity: item.quantity,
      })),
      address: {
        fullName: address.name,
        email: address.email,
        phone: parseInt(address.phone) || 0,
        city: address.city,
        street: address.street,
        province: address.zip,
      },
      totalPrice: total,
    };

    console.log("Sending order data:", dataToSend);

    try {
      const res = await axios.post("https://fakestoreapi.com/carts", dataToSend);
      alert("Order placed successfully!");
      console.log(res.data);
      setOrderPlaced(true);
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="p-3 sm:p-4 md:p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">Your Order is on Delivery</h1>
        <p className="text-green-600 font-semibold mb-4 md:mb-6 text-sm md:text-base">
          Thank you for your order! Your products will be delivered soon.
        </p>

        <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Products on Delivery:</h2>

        {items.map((item) => (
          <div
            key={item.id}
            className="border p-3 md:p-4 mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 bg-gray-50"
          >
            <img src={item.image} className="h-16 md:h-20 w-16 md:w-20 object-contain" />

            <div className="w-full sm:w-1/3">
              <h2 className="font-bold text-sm md:text-base line-clamp-2">{item.title}</h2>
              <p className="text-sm md:text-base">${item.price}</p>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <span className="font-semibold text-sm md:text-base">Qty: {item.quantity}</span>
            </div>

            <p className="font-semibold text-base md:text-lg">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}

        <h2 className="text-lg md:text-xl font-bold mt-6 mb-4">Total: ${total.toFixed(2)}</h2>

        <button
          onClick={() => {
            setOrderPlaced(false);
            setAddress({ name: "", street: "", city: "", zip: "", phone: "" });
          }}
          className="w-full md:w-auto bg-blue-600 text-white py-2 md:py-3 px-4 md:px-6 rounded hover:bg-blue-700 text-sm md:text-base"
        >
          Place New Order
        </button>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4 md:p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Shopping Cart</h1>

      {items.length === 0 && <p className="text-center text-gray-600">No items in cart.</p>}

      {items.map((item) => (
        <div
          key={item.id}
          className="border p-3 md:p-4 mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4"
        >
          <img src={item.image} className="h-16 md:h-20 w-16 md:w-20 object-contain" />

          <div className="w-full sm:w-1/3">
            <h2 className="font-bold text-sm md:text-base line-clamp-2">{item.title}</h2>
            <p className="text-sm md:text-base">${item.price}</p>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              className="bg-gray-300 px-2 md:px-3 py-1 text-sm"
              onClick={() => dispatch(decreaseQty(item.id))}
            >
              -
            </button>

            <span className="text-sm md:text-base">{item.quantity}</span>

            <button
              className="bg-gray-300 px-2 md:px-3 py-1 text-sm"
              onClick={() => dispatch(increaseQty(item.id))}
            >
              +
            </button>
          </div>

          <button
            className="bg-red-500 text-white px-3 md:px-4 py-1 md:py-2 rounded text-sm md:text-base"
            onClick={() => dispatch(removeFromCart(item.id))}
          >
            Remove
          </button>
        </div>
      ))}

      {items.length > 0 && (
        <>
          <h2 className="text-lg md:text-xl font-bold mt-6 mb-2 md:mb-4">Address Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={address.name}
              onChange={handleInputChange}
              className="border p-2 rounded text-sm md:text-base"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={address.email}
              onChange={handleInputChange}
              className="border p-2 rounded text-sm md:text-base"
            />
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={address.street}
              onChange={handleInputChange}
              className="border p-2 rounded text-sm md:text-base"
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={address.city}
              onChange={handleInputChange}
              className="border p-2 rounded text-sm md:text-base"
              required
            />
            <input
              type="text"
              name="zip"
              placeholder="ZIP Code"
              value={address.zip}
              onChange={handleInputChange}
              className="border p-2 rounded text-sm md:text-base"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={address.phone}
              onChange={handleInputChange}
              className="border p-2 rounded text-sm md:text-base"
              required
            />
          </div>

          <h2 className="text-lg md:text-xl font-bold mt-6">Total: ${total.toFixed(2)}</h2>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full md:w-auto bg-green-600 text-white py-2 md:py-3 px-4 md:px-6 rounded mt-4 hover:bg-green-700 disabled:bg-gray-400 text-sm md:text-base"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </>
      )}
    </div>
  );
}
