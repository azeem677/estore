import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";

export default function DashboardHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin-login");
  };

  return (
    <div className="bg-white shadow p-6 flex justify-between items-center">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>

      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{user?.email}</span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
