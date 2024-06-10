import { View, Text, FlatList } from "react-native";
import React from "react";
import orders from "@/src/data/orders";
import OrderItem from "@/src/components/OrderItem";

const OrderScreen = () => {
  const orderData = orders;

  return (
    <FlatList
      data={orderData}
      contentContainerStyle={{
        padding: 10,
        gap: 10,
      }}
      renderItem={(current) => (
        <OrderItem
          created_at={current.item.created_at}
          id={current.item.id}
          status={current.item.status}
          total={current.item.total}
          user_id={current.item.user_id}
          key={current.item.id}
          order_items={current.item.order_items}
        />
      )}
    />
  );
};

export default OrderScreen;
