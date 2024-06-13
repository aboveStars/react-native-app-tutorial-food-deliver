import { useAdminOrderList } from "@/src/api/orders";
import { useInsertOrderSubscription } from "@/src/api/orders/subscriptions";
import OrderItem from "@/src/components/OrderItem";
import { supabase } from "@/src/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, Text } from "react-native";

const OrderScreen = () => {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: false });

  useInsertOrderSubscription();

  if (isLoading) return <ActivityIndicator />;

  if (error) return <Text>Failed to fetch orders.</Text>;

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
