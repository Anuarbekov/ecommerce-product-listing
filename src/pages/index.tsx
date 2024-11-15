"use client";
import { GetServerSideProps } from "next";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { addItemToCart, removeItemFromCart } from "@/redux/cartSlice";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import { Product } from "@/types/Product";

interface ProductListingProps {
  products: Product[];
}

const ProductListing: React.FC<ProductListingProps> = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"price" | "rating" | null>(null); // No sorting initially
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  // Handle toggling sorting
  const toggleSortBy = (criteria: "price" | "rating") => {
    setSortBy(sortBy === criteria ? null : criteria);
  };

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort only when sortBy is set
  const sortedProducts = sortBy
    ? [...filteredProducts].sort((a, b) =>
        sortBy === "price" ? a.price - b.price : b.rating - a.rating
      )
    : filteredProducts;

  return (
    <>
      <Header cart={cart} />
      <div className="container mx-auto p-4">
        <SearchBar setSearchTerm={setSearchTerm} />
        <div className="flex justify-between pb-4">
          <button
            onClick={() => toggleSortBy("price")}
            className={`${
              sortBy === "price" ? "bg-green-500 text-white" : "text-black"
            } border p-2 rounded-xl`}
          >
            {sortBy === "price" ? "Reset" : "Sort by Price"}
          </button>
          <button
            onClick={() => toggleSortBy("rating")}
            className={`${
              sortBy === "rating" ? "bg-green-500 text-white" : "text-black"
            } border p-2 rounded-xl`}
          >
            {sortBy === "rating" ? "Reset" : "Sort by Rating"}
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
          <div className="text-lg font-semibold">
            No products with such name
          </div>
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:3030/products");
  const products: Product[] = await res.json();

  return { props: { products } };
};

export default ProductListing;
