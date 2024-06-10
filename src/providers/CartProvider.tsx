import { PropsWithChildren, createContext, useContext, useState } from "react";
import { CartItem, Product } from "../types";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
};

export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, size: CartItem["size"]) => {
    const alreadyHasObject = items.find(
      (item) => item.product_id === product.id && item.size === size
    );
    if (alreadyHasObject) {
      return updateQuantity(alreadyHasObject.id, 1);
    }

    const newCartItem: CartItem = {
      product: product,
      product_id: product.id,
      quantity: 1,
      size: size,
      id: Date.now().toString(),
    };

    setItems((prev) => [newCartItem, ...prev]);
  };

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    const newItems = items
      .map((item) =>
        item.id !== itemId
          ? item
          : { ...item, quantity: (item.quantity += amount) }
      )
      .filter((item) => item.quantity > 0);

    return setItems(newItems);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        total: items.reduce((total, current) => {
          total += current.quantity * current.product.price;
          return total;
        }, 0),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
