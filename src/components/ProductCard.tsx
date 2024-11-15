import React from "react";
import { Product } from "@/types/Product";
import Image from "next/image";
interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
  isInCart: boolean;
  onRemoveFromCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  isInCart,
  onRemoveFromCart,
}) => (
  <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
    <Image
      src={product.image}
      alt={product.title}
      width={200}
      height={200}
      className="w-full h-48 object-cover rounded-lg mb-4"
    />
    <h2 className="text-xl font-semibold">{product.title}</h2>
    <p className="text-sm text-gray-500 truncate">{product.description}</p>
    <p className="text-lg font-bold mt-2">
      {product.currency} {product.price.toFixed(2)}
    </p>
    <div className="flex items-center mt-2">
      <span className="text-yellow-500">★</span>
      <span className="ml-2">{product.rating}</span>
    </div>

    {isInCart ? (
      <button
        onClick={onRemoveFromCart}
        className="bg-red-500 text-white mt-2 p-1 rounded"
      >
        Delete from Cart
      </button>
    ) : (
      <button
        onClick={onAddToCart}
        className="bg-blue-500 text-white mt-2 p-1 rounded"
      >
        Add to Cart
      </button>
    )}
  </div>
);

export default ProductCard;
