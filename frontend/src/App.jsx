import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import ShopPage from "./pages/ShopPage";
import PaymentSuccess from "./pages/PaymentSuccess";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10 flex-1 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;