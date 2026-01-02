import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getOrders } from "../api/order.api";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrders();
        setOrders(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-sm opacity-70">Loading orders...</p>;
  }

  if (orders.length === 0) {
    return (
      <div>
        <h1 className="mb-6 text-3xl font-semibold">Orders</h1>
        <p className="text-sm opacity-70">
          You haven’t placed any orders yet.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block border border-black px-6 py-2 text-sm hover:bg-black hover:text-white transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-semibold">Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="border border-black/10 p-6"
        >
          {/* Header */}
          <div className="mb-4 flex justify-between text-sm">
            <span className="opacity-70">
              Order #{order._id.slice(-6)}
            </span>

            <span className="opacity-70">
              {new Date(order.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Items */}
          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item._id}
                className="flex justify-between text-sm"
              >
                <span>
                  {item.product.name} × {item.quantity}
                </span>

                <span>
                  ₹{(item.product.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-between border-t border-black/10 pt-4 text-sm">
            <span className="font-medium">Total</span>
            <span className="font-medium">
              ₹{order.totalPrice.toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}