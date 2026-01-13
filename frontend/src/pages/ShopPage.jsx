import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await api.get("/products", {
          params: category ? { category } : {},
        });

        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) {
    return <p className="text-sm opacity-70">Loading products...</p>;
  }

  return (
    <div>
      {/* Page Title */}
      <h1 className="mb-10 text-3xl font-semibold capitalize">
        {category ? category : "Shop"}
      </h1>

      {products.length === 0 ? (
        <p className="text-sm opacity-70">No products found.</p>
      ) : (
        <div className="grid grid-cols-3 gap-10">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
