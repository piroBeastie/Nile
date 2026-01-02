import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  getCart,
  removeFromCart,
  updateCartQty,
} from "../api/cart.api";
import { createOrder } from "../api/order.api";

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await getCart();
      setCart(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return <p className="text-sm opacity-70">Loading cart...</p>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div>
        <h1 className="mb-6 text-3xl font-semibold">Cart</h1>
        <p className="text-sm opacity-70">Your cart is empty.</p>

        <Link
          to="/"
          className="mt-6 inline-block border border-black px-6 py-2 text-sm hover:bg-black hover:text-white transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="grid grid-cols-3 gap-16">
      {/* Items */}
      <div className="col-span-2 space-y-8">
        <h1 className="text-3xl font-semibold">Cart</h1>

        {cart.items.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between border-b border-black/10 pb-6"
          >
            {/* Product */}
            <div className="flex items-center gap-6">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="h-24 w-20 object-cover"
              />

              <div>
                <h3 className="text-lg font-medium">
                  {item.product.name}
                </h3>

                {/* Quantity controls */}
                <div className="mt-2 flex items-center gap-4 text-sm">
                  <button
                    onClick={async () => {
                      if (item.quantity === 1) {
                        await removeFromCart(item._id);
                      } else {
                        await updateCartQty(
                          item._id,
                          item.quantity - 1
                        );
                      }
                      fetchCart();
                    }}
                    className="opacity-60 hover:opacity-100 transition"
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={async () => {
                      await updateCartQty(
                        item._id,
                        item.quantity + 1
                      );
                      fetchCart();
                    }}
                    className="opacity-60 hover:opacity-100 transition"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Price & Remove */}
            <div className="flex items-center gap-8">
              <p className="text-sm">
                ₹{(item.product.price * item.quantity).toLocaleString()}
              </p>

              <button
                onClick={async () => {
                  await removeFromCart(item._id);
                  fetchCart();
                }}
                className="text-sm opacity-60 hover:opacity-100 transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="border border-black/10 p-6 h-fit">
        <h2 className="text-lg font-medium">Summary</h2>

        <div className="mt-6 flex justify-between text-sm">
          <span>Total</span>
          <span>₹{total.toLocaleString()}</span>
        </div>

        <button
        onClick={async () => {
            try {
            await createOrder();
            navigate("/orders");
            } catch (err) {
            if (err.response?.status === 401) {
                navigate("/login");
            } else {
                console.error("Checkout failed", err);
            }
            }
        }}
        className="mt-8 w-full border border-black py-3 text-sm tracking-wide hover:bg-black hover:text-white transition"
        >
        Checkout
        </button>
      </div>
    </div>
  );
}