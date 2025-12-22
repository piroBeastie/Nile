import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductPage() {
  const { id } = useParams();
  const { cartItems, addToCart } = useCart();

  const product = products.find(p => p._id === id);
  if (!product) return <p>Product not found.</p>;

  const isInCart = cartItems.some(
    item => item._id === product._id
  );

  return (
    <div className="grid grid-cols-2 gap-20">
      <div className="bg-white">
        <img
          src={product.image}
          alt={product.name}
          className="h-[520px] w-full object-cover"
        />
      </div>

      <div>
        <p className="mb-2 text-sm uppercase tracking-wider opacity-60">
          {product.category}
        </p>

        <h1 className="mb-4 text-3xl font-semibold">
          {product.name}
        </h1>

        <p className="mb-6 text-lg">
          ₹{product.price.toLocaleString()}
        </p>

        <p className="mb-10 max-w-md leading-relaxed opacity-80">
          {product.description}
        </p>

        <button
          onClick={() => addToCart(product)}
          disabled={isInCart}
          className={`rounded-sm px-8 py-4 text-sm uppercase tracking-wider transition
            ${
              isInCart
                ? "bg-gray-300 text-black cursor-not-allowed"
                : "bg-black text-white hover:opacity-90"
            }
          `}
        >
          {isInCart ? "Added" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
