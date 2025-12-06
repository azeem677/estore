import DashboardLayout from "../../components/DashboardLayout";

export default function Orders() {
  const orders = [
    { id: 1001, customer: "Ahmed Khan", amount: "$120.50", status: "Delivered", date: "2024-12-01" },
    { id: 1002, customer: "Fatima Ali", amount: "$89.99", status: "Pending", date: "2024-12-02" },
    { id: 1003, customer: "Hassan Raza", amount: "$250.00", status: "Processing", date: "2024-12-03" },
    { id: 1004, customer: "Zainab Ahmed", amount: "$175.75", status: "Delivered", date: "2024-12-04" },
    { id: 1005, customer: "Ali Khan", amount: "$99.99", status: "Pending", date: "2024-12-05" },
  ];

  return (
    <DashboardLayout>
      <div className="bg-white p-3 sm:p-4 md:p-6 rounded shadow">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">All Orders</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-xs md:text-sm">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="text-left p-2 md:p-3 font-semibold">Order ID</th>
                <th className="text-left p-2 md:p-3 font-semibold hidden sm:table-cell">Customer</th>
                <th className="text-left p-2 md:p-3 font-semibold">Amount</th>
                <th className="text-left p-2 md:p-3 font-semibold">Status</th>
                <th className="text-left p-2 md:p-3 font-semibold hidden md:table-cell">Date</th>
                <th className="text-left p-2 md:p-3 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="p-2 md:p-3">#{order.id}</td>
                  <td className="p-2 md:p-3 hidden sm:table-cell">{order.customer}</td>
                  <td className="p-2 md:p-3">{order.amount}</td>
                  <td className="p-2 md:p-3">
                    <span
                      className={`px-2 md:px-3 py-1 rounded text-xs md:text-sm font-semibold ${
                        order.status === "Delivered"
                          ? "bg-green-200 text-green-800"
                          : order.status === "Pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-blue-200 text-blue-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-2 md:p-3 hidden md:table-cell">{order.date}</td>
                  <td className="p-2 md:p-3 text-center">
                    <button className="bg-blue-600 text-white px-2 md:px-3 py-1 rounded hover:bg-blue-700 text-xs md:text-sm">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
