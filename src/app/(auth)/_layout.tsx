import { View, Text } from "react-native";
import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/src/lib/AuthProvider";

type Props = {};

const _layout = (props: Props) => {
  const { session } = useAuth();

  if (session) {
    return <Redirect href="/" />;
  }

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
