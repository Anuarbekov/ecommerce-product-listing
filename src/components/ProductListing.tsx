import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "@/redux/cartSlice";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { Product } from "@/types/Product";
import { RootState } from "@/redux/store";

interface ProductListingProps {
  initialProducts: Product[];
}

const ProductListing: React.FC<ProductListingProps> = ({ initialProducts }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"price" | "rating" | null>(null);
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const fetchProducts = async (pageNumber: number) => {
    const response = await fetch(
      `http://localhost:3030/products?page=${pageNumber}`
    );
    const newProducts: Product[] = await response.json();
    setProducts(newProducts);
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortBy === null) return 0;
    return sortBy === "price" ? a.price - b.price : b.rating - a.rating;
  });

  return (
    <div className="container mx-auto p-4 pt-24">
      <SearchBar setSearchTerm={setSearchTerm} />
      <div className="flex justify-between pb-4">
        <button
          onClick={() => setSortBy(sortBy === "price" ? null : "price")}
          className={`${sortBy === "price" ? "bg-green-500 text-white" : "text-black"} border p-2 rounded-xl`}
        >
          Sort by Price
        </button>
        <button
          onClick={() => setSortBy(sortBy === "rating" ? null : "rating")}
          className={`${sortBy === "rating" ? "bg-green-500 text-white" : "text-black"} border p-2 rounded-xl`}
        >
          Sort by Rating
        </button>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
          {sortedProducts.map((product) => {
            const isInCart = cart.items.some(
              (cartItem) => cartItem.id === product.id
            );
            return (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => dispatch(addItemToCart(product))}
                onRemoveFromCart={() => dispatch(removeItemFromCart(product))}
                isInCart={isInCart}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-lg font-semibold">No products with such name</div>
      )}

      <div className="flex justify-between pt-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="border p-2 rounded-xl"
        >
          Previous
        </button>
        <span className="p-2">{`Page ${page}`}</span>
        <button
          onClick={() => setPage(page + 1)}
          className="border p-2 rounded-xl"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductListing;
