import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/Product";

export interface CartState {
  items: Product[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<Product>) {
      state.items.push(action.payload);
      state.totalQuantity += 1;
      state.totalPrice += action.payload.price;
    },
    removeItemFromCart(state, action: PayloadAction<Product>) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.totalQuantity -= 1;
      state.totalPrice -= action.payload.price;
    },
  },
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;
