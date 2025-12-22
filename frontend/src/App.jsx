import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import OrderPage from "./pages/OrderPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import CartPage from "./pages/CartPage";
import Footer from "./components/Footer";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1400px] px-10 py-6">
        <Navbar />

        <main className="py-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/category/:type" element={<CategoryPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />

            <Route path="/orders" element={
              <ProtectedRoute>
                <OrderPage/>
              </ProtectedRoute>
            }/>
            <Route path="/order/:id" element={
              <ProtectedRoute>
                <OrderDetailPage />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App
