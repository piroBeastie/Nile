import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product._id}`} className="group block">
      <div className="relative overflow-hidden bg-white">
        <img
          src={product.image}
          alt={product.name}
          className="h-[320px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="mt-4 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-medium leading-tight">
            {product.name}
          </h3>
          <p className="mt-1 text-sm opacity-70">
            {product.category}
          </p>
        </div>

        <p className="text-sm font-medium">
          ₹{product.price.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}