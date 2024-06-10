import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import Button from "../components/Button";

const index = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user)"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(admin)"} asChild>
        <Button text="Admin" />
      </Link>

      <Link href={"/(auth)/signIn"} asChild>
        <Button text="Sign In" />
      </Link>
      <Link href={"/(auth)/signUp"} asChild>
        <Button text="Sign Up" />
      </Link>
    </View>
  );
};

export default index;
