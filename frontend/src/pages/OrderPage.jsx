import { Link } from "react-router-dom";

export default function OrderPage() {
  // dummy orders for UI
  const orders = [
    {
      _id: "ORD123",
      createdAt: "2025-01-10",
      totalPrice: 104998,
      isPaid: true,
    },
    {
      _id: "ORD124",
      createdAt: "2025-01-15",
      totalPrice: 24999,
      isPaid: false,
    },
  ];

  return (
    <div>
      <h1 className="mb-10 text-3xl font-semibold">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="opacity-70">You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <Link
                key={order._id}
                to={`/order/${order._id}`}
                className="block w-full flex items-center justify-between border-b pb-6 hover:opacity-80"
                >
                <div>
                    <p className="font-medium">
                    Order #{order._id}
                    </p>
                    <p className="text-sm opacity-70">
                    Placed on {order.createdAt}
                    </p>
                </div>

                <div className="text-right">
                    <p className="font-medium">
                    ₹{order.totalPrice.toLocaleString()}
                    </p>
                    <p
                    className={`text-sm ${
                        order.isPaid
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                    >
                    {order.isPaid ? "Paid" : "Pending Payment"}
                    </p>
                </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
