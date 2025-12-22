import { useParams } from "react-router-dom";

export default function OrderDetailPage() {
  const { id } = useParams();

  // dummy order (UI-only)
  const order = {
    _id: id,
    createdAt: "2025-01-15",
    isPaid: true,
    items: [
      {
        _id: "1",
        name: "Oak Lounge Chair",
        price: 24999,
        qty: 2,
        image:
          "https://images.unsplash.com/photo-1549187774-b4e9b0445b41",
      },
      {
        _id: "2",
        name: "Linen Sofa",
        price: 79999,
        qty: 1,
        image:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
      },
    ],
  };

  const total = order.items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div>
      <h1 className="mb-6 text-3xl font-semibold">
        Order #{order._id}
      </h1>

      <p className="mb-10 text-sm opacity-70">
        Placed on {order.createdAt}
      </p>

      <div className="mb-12 flex items-center gap-4">
        <span className="text-sm">Status:</span>
        <span
          className={`text-sm font-medium ${
            order.isPaid
              ? "text-green-600"
              : "text-yellow-600"
          }`}
        >
          {order.isPaid ? "Paid" : "Pending Payment"}
        </span>
      </div>

      {/* ITEMS */}
      <div className="space-y-8">
        {order.items.map(item => (
          <div
            key={item._id}
            className="flex items-center gap-6 border-b pb-6"
          >
            <div className="h-24 w-24 bg-white">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm opacity-70">
                ₹{item.price.toLocaleString()} × {item.qty}
              </p>
            </div>

            <p className="font-medium">
              ₹{(item.price * item.qty).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="mt-12 flex justify-end">
        <div className="w-[300px] bg-white p-6">
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}