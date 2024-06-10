import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Order } from "../types";
import { formatDistanceToNow } from "date-fns";
import { router, useSegments } from "expo-router";

const OrderItem = ({
  created_at,
  id,
  status,
  total,
  user_id,
  order_items,
}: Order) => {
  const segments = useSegments();

  return (
    <Pressable
      onPress={() => {
        router.push(`/${segments[0]}/orders/${id}`);
      }}
      style={{
        height: 80,
      }}
    >
      <View style={styles.container}>
        <View
          style={{
            gap: 5,
          }}
        >
          <Text style={styles.orderIdText}>Order #{id}</Text>
          <Text style={styles.timeText}>{formatDistanceToNow(created_at)}</Text>
        </View>
        <Text style={styles.statusText}>{status}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    borderRadius: 10,
    flexDirection: "row",
  },
  orderIdText: {
    fontSize: 15,
    fontWeight: "700",
  },
  timeText: {
    fontSize: 12,
    color: "gray",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default OrderItem;
