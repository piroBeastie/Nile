import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <header className="border-b border-black/10">
      <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-lg font-semibold tracking-wide"
        >
          NILE.
        </Link>

        {/* Right actions */}
        <nav className="flex items-center gap-8 text-sm">
          <Link
            to="/cart"
            className="hover:opacity-70 transition"
          >
            Cart
          </Link>

          {isAuthenticated && (
            <Link
              to="/orders"
              className="hover:opacity-70 transition"
            >
              Orders
            </Link>
          )}

          {!isAuthenticated ? (
            <Link
              to="/login"
              className="border border-black px-6 py-2 transition hover:bg-black hover:text-white"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="border border-black px-6 py-2 transition hover:bg-black hover:text-white"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}