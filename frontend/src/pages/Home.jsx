import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const featured = products.filter(p => p.isFeatured);

  return (
    <>
      <h2 className="mb-10 text-3xl font-semibold tracking-wide">
        Featured Pieces
      </h2>

      <div className="grid grid-cols-3 gap-10">
        {featured.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  );
}