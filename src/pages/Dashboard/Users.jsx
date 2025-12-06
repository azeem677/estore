import DashboardLayout from "../../components/DashboardLayout";

export default function Users() {
  const users = [
    { id: 1, name: "Ahmed Khan", email: "ahmed@example.com", phone: "03001234567", status: "Active" },
    { id: 2, name: "Fatima Ali", email: "fatima@example.com", phone: "03101234567", status: "Active" },
    { id: 3, name: "Hassan Raza", email: "hassan@example.com", phone: "03201234567", status: "Inactive" },
    { id: 4, name: "Zainab Ahmed", email: "zainab@example.com", phone: "03301234567", status: "Active" },
    { id: 5, name: "Ali Khan", email: "ali@example.com", phone: "03401234567", status: "Active" },
  ];

  return (
    <DashboardLayout>
      <div className="bg-white p-3 sm:p-4 md:p-6 rounded shadow">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">All Users</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-xs md:text-sm">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="text-left p-2 md:p-3 font-semibold">User ID</th>
                <th className="text-left p-2 md:p-3 font-semibold">Name</th>
                <th className="text-left p-2 md:p-3 font-semibold hidden sm:table-cell">Email</th>
                <th className="text-left p-2 md:p-3 font-semibold hidden md:table-cell">Phone</th>
                <th className="text-left p-2 md:p-3 font-semibold">Status</th>
                <th className="text-left p-2 md:p-3 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-2 md:p-3">#{user.id}</td>
                  <td className="p-2 md:p-3">{user.name}</td>
                  <td className="p-2 md:p-3 hidden sm:table-cell">{user.email}</td>
                  <td className="p-2 md:p-3 hidden md:table-cell">{user.phone}</td>
                  <td className="p-2 md:p-3">
                    <span
                      className={`px-2 md:px-3 py-1 rounded text-xs md:text-sm font-semibold ${
                        user.status === "Active"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="p-2 md:p-3">
                    <div className="flex flex-col sm:flex-row gap-1 md:space-x-2">
                      <button className="bg-blue-600 text-white px-2 md:px-3 py-1 rounded hover:bg-blue-700 text-xs md:text-sm">
                        Edit
                      </button>
                      <button className="bg-red-600 text-white px-2 md:px-3 py-1 rounded hover:bg-red-700 text-xs md:text-sm">
                        Delete
                      </button>
                    </div>
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
