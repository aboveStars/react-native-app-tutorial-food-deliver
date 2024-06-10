import { Stack } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="list"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: "Order Detail",
        }}
      />
    </Stack>
  );
};

export default _layout;
