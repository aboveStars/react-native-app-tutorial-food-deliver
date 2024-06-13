import { PropsWithChildren, createContext, useContext, useState } from "react";
import { CartItem, Product } from "../types";
import { useInsertOrder } from "../api/orders";
import { router } from "expo-router";
import { useInsertOrderItem } from "../api/orderItems";
import { initPaymentSheet } from "@stripe/stripe-react-native";
import { initialisePaymentSheet, openPaymentSheet } from "../lib/stripe";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
  checkout: () => void;
};

export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const { mutate: insertOrder } = useInsertOrder();

  const { mutate: insertOrderItems } = useInsertOrderItem();

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

  const checkOut = async () => {
    const inPennies = Math.floor(total() * 100);

    await initialisePaymentSheet(inPennies);

    const payed = await openPaymentSheet();

    if (!payed) {
      console.error("User cancelled payment!");
    }

    insertOrder(
      {
        status: "New",
        total: inPennies,
      },
      {
        onSuccess: (data: any) => {
          saveOrderItems(data);
        },
      }
    );
  };

  const saveOrderItems = (data: any) => {
    console.log("Save order initiated.");

    const orderItems = items.map((a) => ({
      order_id: data.id,
      product_id: a.product_id,
      quantity: a.quantity,
      size: a.size,
    }));

    insertOrderItems(orderItems, {
      onSuccess() {
        console.log("We are in on success of insertOrderItems");
        clearItems();
        router.replace(`/(user)/orders/${data.id}`);
      },
    });
  };

  const clearItems = () => {
    setItems([]);
  };

  const total = () => {
    return items.reduce((total, current) => {
      total += current.quantity * current.product.price;
      return total;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        total: total(),
        checkout: checkOut,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
