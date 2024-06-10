import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

type Props = {};

const _layout = (props: Props) => {
  return (
    <Stack>
      <Stack.Screen
        name="signUp"
        options={{
          title: "Sign Up",
        }}
      />
      <Stack.Screen
        name="signIn"
        options={{
          title: "Sign In",
        }}
      />
    </Stack>
  );
};

export default _layout;
