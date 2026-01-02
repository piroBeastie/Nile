import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../api/product.api";
import { addToCart } from "../api/cart.api";
import { getCart } from "../api/cart.api";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1️⃣ Fetch product
        const productRes = await getProductById(id);
        const productData =
          productRes.data.product || productRes.data;
        setProduct(productData);

        // 2️⃣ Fetch cart
        const cartRes = await getCart();

        // 3️⃣ Check if already in cart
        const exists = cartRes.data.items.some(
          (item) => item.product._id === productData._id
        );

        if (exists) {
          setAdded(true);
        }
      } catch (err) {
        // If user not logged in, cart fetch will fail → ignore
        console.log("Cart check skipped");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      setAdding(true);
      await addToCart(product._id, 1);
      setAdded(true);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return <p className="text-sm opacity-70">Loading...</p>;
  }

  if (!product) {
    return <p className="text-sm opacity-70">Product not found</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-16">
      {/* Image */}
      <div className="bg-white">
        <img
          src={product.image}
          alt={product.name}
          className="h-[520px] w-full object-cover"
        />
      </div>

      {/* Details */}
      <div>
        <h1 className="text-3xl font-semibold leading-tight">
          {product.name}
        </h1>

        <p className="mt-2 text-sm opacity-70">
          {product.category}
        </p>

        <p className="mt-6 text-xl font-medium">
          ₹{product.price.toLocaleString()}
        </p>

        <p className="mt-6 max-w-md text-sm leading-relaxed opacity-80">
          {product.description}
        </p>

        <button
          onClick={handleAddToCart}
          disabled={adding || added}
          className="mt-10 inline-block border border-black px-10 py-3 text-sm tracking-wide transition hover:bg-black hover:text-white disabled:opacity-50"
        >
          {added
            ? "Added to Cart"
            : adding
            ? "Adding..."
            : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}