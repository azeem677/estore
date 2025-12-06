export default function Home() {
  return (
    <div className="p-4 md:p-6 text-center">
      <h1 className="text-2xl md:text-4xl font-bold mb-4">Welcome to Ecommerce Store</h1>
      <p className="text-gray-600 text-sm md:text-base mb-6">Browse our amazing collection of products</p>
      <a href="/products" className="inline-block bg-blue-600 text-white px-6 py-2 md:py-3 rounded hover:bg-blue-700">
        Shop Now
      </a>
    </div>
  );
}
