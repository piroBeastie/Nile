import { Link } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import { loginUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const form = e.target;
      const email = form.email.value;
      const password = form.password.value;

      const data = await loginUser(email, password);

      login(data.user, data.token);

      const from = location.state?.from || "/";
      navigate(from, { replace: true });

    } catch (err) {
      alert(err.message);
    }
  }
  return (
    <AuthLayout title="Sign in to Nile">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="mb-1 block text-sm">
            Email
          </label>
          <input
            name="email"
            type="email"
            className="w-full border px-3 py-2 outline-none focus:border-black"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm">
            Password
          </label>
          <input
            name="password"
            type="password"
            className="w-full border px-3 py-2 outline-none focus:border-black"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black py-3 text-sm uppercase tracking-wider text-white hover:opacity-90"
        >
          Sign In
        </button>

        <p className="text-center text-sm opacity-70">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="underline hover:opacity-100"
          >
            Create one
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}