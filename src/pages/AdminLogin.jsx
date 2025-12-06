import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Simple validation
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    // Mock authentication (replace with real API call)
    if (email === "admin@example.com" && password === "admin123") {
      dispatch(login({ email, role: "admin" }));
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-3 sm:p-4">
      <div className="bg-white shadow-lg p-4 sm:p-6 md:p-8 rounded w-full sm:w-96">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center">Admin Login</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded mb-4 text-sm md:text-base">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-3 md:space-y-4">
          <div>
            <label className="block text-xs md:text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="border p-2 md:p-3 w-full rounded text-sm md:text-base"
            />
          </div>

          <div>
            <label className="block text-xs md:text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="border p-2 md:p-3 w-full rounded text-sm md:text-base"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 md:py-3 rounded font-semibold hover:bg-blue-700 text-sm md:text-base"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4 text-xs md:text-sm">
          Demo credentials: <br />
          Email: <strong>admin@example.com</strong> <br />
          Password: <strong>admin123</strong>
        </p>
      </div>
    </div>
  );
}
