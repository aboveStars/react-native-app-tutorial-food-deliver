import { Link, Redirect } from "expo-router";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import Button from "../components/Button";
import { useAuth } from "../lib/AuthProvider";
import { supabase } from "../lib/supabase";

const index = () => {
  const { session, loading, isAdmin } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href="/(auth)/signIn" />;
  }

  if (!isAdmin) {
    return <Redirect href="/(user)" />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user)"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(admin)"} asChild>
        <Button text="Admin" />
      </Link>

      <Button
        text="Sign Out"
        onPress={() => {
          supabase.auth.signOut();
        }}
      />
    </View>
  );
};

export default index;
