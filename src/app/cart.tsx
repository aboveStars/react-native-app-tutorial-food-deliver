import React from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { useCart } from "../providers/CartProvider";
import CartListItem from "../components/CartListItem";
import Button from "../components/Button";

const CartScreen = () => {
  const { items, total } = useCart();

  const { checkout } = useCart();

  return (
    <SafeAreaView style={{ flex: 1 }}>
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

      <Text
        style={{
          fontSize: 20,
          fontWeight: 600,
          textAlign: "center",
          paddingTop: "auto",
        }}
      >
        ${total}
      </Text>

      <Button text="Checkout" onPress={checkout} />
    </SafeAreaView>
  );
};

export default CartScreen;
