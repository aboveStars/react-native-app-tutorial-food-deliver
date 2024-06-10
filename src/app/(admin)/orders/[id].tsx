import OrderItem from "@/src/components/OrderItem";
import OrderListItem from "@/src/components/OrderListItem";
import orders from "@/src/data/orders";
import { OrderStatusList } from "@/src/types";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, Pressable, SafeAreaView, View, Text } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const OrderDetail = () => {
  const { id } = useLocalSearchParams();

  const orderData = orders.find((order) => order.id.toString() === id);

  if (!orderData) {
    return <View>Not Found</View>;
  }

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
          ListFooterComponent={() => (
            <>
              <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                Status
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: 5,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {OrderStatusList.map((status) => (
                  <Pressable
                    key={status}
                    // onPress={() => updateStatus(status)}
                    style={{
                      borderColor: Colors.light.tint,
                      borderWidth: 1,
                      padding: 10,
                      borderRadius: 5,
                      marginVertical: 10,
                      backgroundColor:
                        orderData.status === status
                          ? "black"
                          : "transparent",
                    }}
                  >
                    <Text
                      style={{
                        color:
                          orderData.status === status
                            ? "white"
                            : Colors.light.tint,
                      }}
                    >
                      {status}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default OrderDetail;
