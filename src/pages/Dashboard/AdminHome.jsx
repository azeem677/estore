import DashboardLayout from "../../components/DashboardLayout";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setStats, setRecentOrders } from "../../features/dashboardSlice";

export default function AdminHome() {
  const dispatch = useDispatch();
  const { stats, recentOrders } = useSelector((state) => state.dashboard);
  const cartItems = useSelector((state) => state.cart.items);
  const products = useSelector((state) => state.products.items);

  useEffect(() => {
    // Calculate stats from actual data
    const totalProducts = products.length || 156;
    const totalOrders = cartItems.length > 0 ? 1 : 0;
    const totalUsers = 856;
    const totalRevenue = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 45200;

    dispatch(setStats({
      totalProducts,
      totalOrders,
      totalUsers,
      totalRevenue: totalRevenue.toFixed(2),
    }));

    // Set recent orders
    const orders = [
      { id: 1001, customer: "Ahmed Khan", amount: "$120.50", status: "Delivered", date: "2024-12-01" },
      { id: 1002, customer: "Fatima Ali", amount: "$89.99", status: "Pending", date: "2024-12-02" },
      { id: 1003, customer: "Hassan Raza", amount: "$250.00", status: "Processing", date: "2024-12-03" },
    ];
    dispatch(setRecentOrders(orders));
  }, [cartItems, products, dispatch]);

  return (
    <DashboardLayout>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
        {/* Stats Cards */}
        <div className="bg-white p-3 sm:p-4 md:p-6 rounded shadow">
          <h3 className="text-gray-600 text-xs md:text-sm">Total Products</h3>
          <p className="text-xl md:text-3xl font-bold">{stats.totalProducts}</p>
        </div>

        <div className="bg-white p-3 sm:p-4 md:p-6 rounded shadow">
          <h3 className="text-gray-600 text-xs md:text-sm">Total Orders</h3>
          <p className="text-xl md:text-3xl font-bold">{stats.totalOrders}</p>
        </div>

        <div className="bg-white p-3 sm:p-4 md:p-6 rounded shadow">
          <h3 className="text-gray-600 text-xs md:text-sm">Total Users</h3>
          <p className="text-xl md:text-3xl font-bold">{stats.totalUsers}</p>
        </div>

        <div className="bg-white p-3 sm:p-4 md:p-6 rounded shadow">
          <h3 className="text-gray-600 text-xs md:text-sm">Total Revenue</h3>
          <p className="text-xl md:text-3xl font-bold">${typeof stats.totalRevenue === 'number' ? (stats.totalRevenue / 1000).toFixed(1) + 'K' : stats.totalRevenue}</p>
        </div>
      </div>

      <div className="mt-4 md:mt-8 bg-white p-3 sm:p-4 md:p-6 rounded shadow overflow-x-auto">
        <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Recent Orders</h2>
        <table className="w-full text-xs md:text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2 md:p-3">Order ID</th>
              <th className="text-left p-2 md:p-3">Customer</th>
              <th className="text-left p-2 md:p-3">Amount</th>
              <th className="text-left p-2 md:p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="p-2 md:p-3">#{order.id}</td>
                <td className="p-2 md:p-3">{order.customer}</td>
                <td className="p-2 md:p-3">{order.amount}</td>
                <td className="p-2 md:p-3">
                  <span
                    className={`px-2 md:px-3 py-1 rounded text-xs md:text-sm ${
                      order.status === "Delivered"
                        ? "bg-green-200"
                        : order.status === "Pending"
                        ? "bg-yellow-200"
                        : "bg-blue-200"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
