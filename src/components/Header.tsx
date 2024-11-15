import React from "react";

import { CartState } from "../redux/cartSlice";

interface HeaderProps {
  cart: CartState;
}

const Header: React.FC<HeaderProps> = ({ cart }) => {
  return (
    <header className="p-4 bg-blue-500 text-white w-full flex flex-row items-center">
      <h1 className="text-lg font-bold">E-commerce Store</h1>
      <div className="ml-auto">
        <p>Items in Cart: {cart.totalQuantity}</p>
        <p>Total Price: ${cart.totalPrice.toFixed(2)}</p>
      </div>
      <div>
        {cart.items?.map((item) => (
          <div key={item.id}>
            <p>
              {item.title} - ${item.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </header>
  );
};

export default Header;
