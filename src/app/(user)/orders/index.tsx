import { useMyOrderList } from "@/src/api/orders";
import OrderItem from "@/src/components/OrderItem";
import React from "react";
import { FlatList } from "react-native";

const OrderScreen = () => {
  const { data: orders, isLoading, error } = useMyOrderList();

  return (
    <FlatList
      data={orders}
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
