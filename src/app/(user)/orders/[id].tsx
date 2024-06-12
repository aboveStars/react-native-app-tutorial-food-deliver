import { useOrderDetails } from "@/src/api/orders";
import { useUpdateOrderSubsription } from "@/src/api/orders/subscriptions";
import OrderItem from "@/src/components/OrderItem";
import OrderListItem from "@/src/components/OrderListItem";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from "react-native";

const OrderDetail = () => {
  const { id: idString } = useLocalSearchParams();

  const id = parseFloat(
    idString === undefined
      ? ""
      : typeof idString === "string"
      ? idString
      : idString[0]
  );

  const { data: orderData, isLoading, error } = useOrderDetails(id);

  useUpdateOrderSubsription(id);

  if (isLoading) return <ActivityIndicator />;

  if (error) return <Text>Failed to get order detail.</Text>;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTitle: `Order #${id}`,
        }}
      />

      <View
        style={{
          padding: 10,
        }}
      >
        <OrderItem
          created_at={orderData.created_at}
          id={orderData.id}
          status={orderData.status}
          total={orderData.total}
          user_id={orderData.user_id}
          order_items={orderData.order_items}
        />
      </View>

      <View
        style={{
          flex: 1,
        }}
      >
        <FlatList
          data={orderData["order_items"]}
          renderItem={(current) => (
            <OrderListItem
              cartItem={{
                id: current.item.id.toString(),
                product: current.item.products,
                product_id: current.item.product_id,
                quantity: current.item.quantity,
                size: current.item.size,
              }}
            />
          )}
          contentContainerStyle={{
            gap: 10,
            padding: 10,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default OrderDetail;
