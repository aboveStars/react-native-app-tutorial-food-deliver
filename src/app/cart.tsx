import React from "react";
import { FlatList, Text, View } from "react-native";
import { useCart } from "../providers/CartProvider";
import CartListItem from "../components/CartListItem";

const CartScreen = () => {
  const { items } = useCart();

  return (
    <View>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <CartListItem cartItem={item} key={item.id} />
        )}
        contentContainerStyle={{
          padding: 10,
          gap: 10,
        }}
      />
    </View>
  );
};

export default CartScreen;
