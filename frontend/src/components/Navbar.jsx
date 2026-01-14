import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const categories = [
  { label: "Seating", value: "seating" },
  { label: "Sofas", value: "sofas" },
  { label: "Tables", value: "tables" },
  { label: "Storage", value: "storage" },
  { label: "Decor", value: "decor" },
];

export default function Navbar() {
  const { isAuthenticated, logoutUser, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const activeCategory = params.get("category");

  if (loading) return null;

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  return (
    <header className="border-b border-black/10">
      <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
        {/* Logo = Home*/}
        <Link to="/" className="text-lg font-semibold tracking-wide">
          NILE.
        </Link>

        {/* Categories */}
        <nav className="flex items-center gap-8 text-sm">
          {categories.map((cat) => (
            <Link
              key={cat.value}
              to={`/shop?category=${cat.value}`}
              className={`transition hover:opacity-70 ${
                activeCategory === cat.value ? "underline" : ""
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-8 text-sm">
          <Link to="/cart" className="hover:opacity-70 transition">
            Cart
          </Link>

          {isAuthenticated && (
            <Link to="/orders" className="hover:opacity-70 transition">
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
        </div>
      </div>
    </header>
  );
}