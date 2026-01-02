import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../api/product.api";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        const allProducts = res.data.products || res.data;

        // SAME logic you had earlier
        const featured = allProducts.filter(p => p.isFeatured);
        setProducts(featured);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-sm opacity-70">
        Loading...
      </p>
    );
  }

  return (
    <>
      <h2 className="mb-10 text-3xl font-semibold tracking-wide">
        Featured Pieces
      </h2>

      <div className="grid grid-cols-3 gap-10">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  );
}