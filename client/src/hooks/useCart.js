import Context from "../context";

import { useContext } from "react";

export const useCart = () => {
  const { cartItems, cartClosedHandler, setCartItems } = useContext(Context);

  const totalPrice = cartItems.reduce((acc, el) => el.price + acc, 0);
  const tax = (totalPrice * 0.05).toFixed(2);

  return { cartItems, totalPrice, tax, cartClosedHandler, setCartItems };
};
