import React from "react";

import { CartState } from "@/redux/cartSlice";

interface HeaderProps {
  cart: CartState;
}

const Header: React.FC<HeaderProps> = ({ cart }) => {
  return (
    <header className="p-4 bg-blue-500 text-white w-full flex flex-row items-center justify-between">
      <h1 className="md:text-lg font-semibold text-md">greyball store</h1>
      <div>
        <p className="md:text-lg font-semibold text-sm">
          Items in Cart: {cart.totalQuantity}
        </p>
        <p className="md:text-lg font-semibold text-sm">
          Total Price: ${cart.totalPrice.toFixed(2)}
        </p>
      </div>
    </header>
  );
};

export default Header;
