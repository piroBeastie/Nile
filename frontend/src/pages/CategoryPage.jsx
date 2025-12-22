import { useParams } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { CATEGORIES } from "../constants/categories";

export default function CategoryPage() {
  const {type} = useParams();

  if (!CATEGORIES.includes(type)) {
    return <p className="text-lg">Category not found.</p>;
  }

  const filtered = products.filter(
    product => product.category === type
  );

  return (
    <>
      <h2 className="mb-10 text-3xl font-semibold tracking-wide">
        {type}
      </h2>
      {filtered.length === 0 ? (
        <div className="flex min-h-[300px] items-center">
          <p className="text-lg opacity-70">
            No products available in this category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-10">
          {filtered.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
