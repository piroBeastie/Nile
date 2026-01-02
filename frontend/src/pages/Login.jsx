import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { loginUser, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await loginUser(form);
      navigate("/");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-8 text-3xl font-semibold tracking-wide">
        Login
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div>
          <label className="mb-2 block text-sm">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-black/30 bg-transparent px-4 py-3 text-sm focus:outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label className="mb-2 block text-sm">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border border-black/30 bg-transparent px-4 py-3 text-sm focus:outline-none"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full border border-black py-3 text-sm tracking-wide transition hover:bg-black hover:text-white disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-6 text-sm opacity-70">
        No account?{" "}
        <Link
          to="/register"
          className="underline hover:opacity-100"
        >
          Register
        </Link>
      </p>
    </div>
  );
}