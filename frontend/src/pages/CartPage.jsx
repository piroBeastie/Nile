import { useCart } from "../context/CartContext";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div>
      <h1 className="mb-12 text-3xl font-semibold">Your Cart</h1>

      <div className="flex gap-20">
        {/* CART ITEMS */}
        <div className="flex-1 space-y-10">
          {cartItems.length === 0 ? (
            <div className="opacity-70">
              <p>Your cart is empty.</p>
              <p className="mt-2 text-sm">
                Browse our collections to find something you love.
              </p>
            </div>
          ) : (
            cartItems.map(item => (
              <div
                key={item._id}
                className="flex gap-6 border-b pb-8"
              >
                {/* IMAGE */}
                <div className="h-28 w-28 bg-white">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* DETAILS */}
                <div className="flex flex-1 justify-between">
                  <div>
                    <h3 className="mb-1 font-medium">
                      {item.name}
                    </h3>
                    <p className="mb-3 text-sm opacity-70">
                      ₹{item.price.toLocaleString()}
                    </p>

                    {/* QTY CONTROLS */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => decreaseQty(item._id)}
                        className="h-8 w-8 border text-sm hover:bg-black hover:text-white"
                      >
                        −
                      </button>

                      <span className="text-sm">{item.qty}</span>

                      <button
                        onClick={() => increaseQty(item._id)}
                        className="h-8 w-8 border text-sm hover:bg-black hover:text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-sm opacity-60 hover:opacity-100"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ORDER SUMMARY */}
        <div className="w-[360px] bg-white p-8">
          <h2 className="mb-6 text-lg font-medium">
            Order Summary
          </h2>

          <div className="mb-4 flex justify-between text-sm">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>

          <div className="mb-6 flex justify-between text-sm">
            <span>Shipping</span>
            <span className="opacity-70">Calculated at checkout</span>
          </div>

          <div className="mb-8 flex justify-between font-medium">
            <span>Total</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>

          <button className="w-full bg-black py-4 text-sm uppercase tracking-wider text-white hover:opacity-90">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}