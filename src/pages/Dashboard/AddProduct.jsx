import DashboardLayout from "../../components/DashboardLayout";
import { useState } from "react";
import axios from "axios";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.image) {
      alert("Please fill all required fields!");
      return;
    }

    setLoading(true);

    try {
      // FakeStore API doesn't support file uploads, so we create a product object
      // In real scenario, you'd handle image uploads differently
      const productData = {
        title: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        category: formData.category || "electronics",
        image: "https://via.placeholder.com/400?text=" + encodeURIComponent(formData.name),
      };

      // Send to FakeStore API
      const response = await axios.post("https://fakestoreapi.com/products", productData);

      alert("Product added successfully!");
      console.log("Product created:", response.data);
      
      // Reset form
      setFormData({ name: "", price: "", category: "", description: "", image: null });
      setPreview(null);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded shadow w-full md:max-w-2xl">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Add New Product</h2>

        <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
          <div>
            <label className="block text-xs md:text-sm font-semibold mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="border p-2 md:p-3 w-full rounded text-sm md:text-base"
              required
            />
          </div>

          <div>
            <label className="block text-xs md:text-sm font-semibold mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="border p-2 md:p-3 w-full rounded text-sm md:text-base"
              required
            />
          </div>

          <div>
            <label className="block text-xs md:text-sm font-semibold mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border p-2 md:p-3 w-full rounded text-sm md:text-base"
              required
            >
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs md:text-sm font-semibold mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows="4"
              className="border p-2 md:p-3 w-full rounded text-sm md:text-base"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-xs md:text-sm font-semibold mb-2">Product Image</label>
            <div className="border-2 border-dashed border-gray-300 p-4 md:p-6 rounded text-center cursor-pointer hover:border-blue-500 transition">
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
                id="image-input"
                required
              />
              <label htmlFor="image-input" className="cursor-pointer">
                <div className="text-gray-600">
                  <p className="text-base md:text-lg font-semibold">📷 Click to upload or drag image</p>
                  <p className="text-xs md:text-sm">PNG, JPG, GIF (max. 5MB)</p>
                </div>
              </label>
            </div>

            {/* Image Preview */}
            {preview && (
              <div className="mt-4">
                <p className="text-xs md:text-sm font-semibold mb-2">Preview:</p>
                <img src={preview} alt="preview" className="h-24 md:h-40 w-24 md:w-40 object-cover rounded border" />
                <p className="text-xs md:text-sm text-gray-600 mt-2">{formData.image.name}</p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 md:py-3 px-4 md:px-6 rounded font-semibold hover:bg-blue-700 disabled:bg-gray-400 w-full text-sm md:text-base"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
