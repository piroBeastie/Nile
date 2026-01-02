import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const { registerUser, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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
      await registerUser(form);
      navigate("/login");
    } catch {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-8 text-3xl font-semibold tracking-wide">
        Register
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="mb-2 block text-sm">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-black/30 bg-transparent px-4 py-3 text-sm focus:outline-none"
          />
        </div>

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
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>

      <p className="mt-6 text-sm opacity-70">
        Already have an account?{" "}
        <Link
          to="/login"
          className="underline hover:opacity-100"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
