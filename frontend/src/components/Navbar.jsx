import { Link, useLocation } from "react-router-dom";
import { CATEGORIES } from "../constants/categories";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <header className="border-b border-black/10">
      <div className="flex items-center justify-between py-6">

        <Link to="/" className="text-2xl font-semibold tracking-wide">
          NILE<span className="text-[color:var(--accent)]">.</span>
        </Link>

        <nav className="flex gap-10 text-sm uppercase tracking-wider">
          {CATEGORIES.map(cat => (
            <Link
              key={cat}
              to={`/category/${cat}`}
              className="hover:opacity-60"
            >
              {cat}
            </Link>
          ))}
        </nav>

        <div className="flex gap-6 text-sm">
          {user ? (
            <button onClick={logout} className="hover:opacity-60">
              Logout
            </button>
          ) : (
            <Link to="/login" state={{ from: location.pathname }} className="hover:opacity-60">
              Sign In
            </Link>
          )}
          <Link to="/orders" className="hover:opacity-60">
            Orders
          </Link>
          <Link to="/cart" className="hover:opacity-60">
            Cart ({cartItems.length})
          </Link>
        </div>
      </div>
    </header>
  );
}