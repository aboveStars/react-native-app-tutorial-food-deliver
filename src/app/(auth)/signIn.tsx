import { View, Text, SafeAreaView, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import Button from "@/src/components/Button";
import { router } from "expo-router";

const signIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignInButton = () => {};

  const handleSignUpButton = () => {
    router.replace("/(auth)/signUp");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View style={styles.container}>
        <View style={styles.emailContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.email}
            placeholder="yunuskorkmaz@apidon.com"
          />
        </View>

        <View style={styles.emailContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            style={styles.password}
            placeholder="****"
          />
        </View>

        <Button text="Sign In" onPress={handleSignInButton} />

        <Text
          style={{
            textAlign: "center",
          }}
          onPress={handleSignUpButton}
        >
          Sign Up
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    gap: 10,
    flex: 1,
    justifyContent: "center",
  },
  label: {
    color: "gray",
    fontSize: 12,
    fontWeight: 600,
  },
  emailContainer: {
    gap: 5,
  },
  email: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    height: 30,
    padding: 5,
  },
  password: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    height: 30,
    padding: 5,
  },
});

export default signIn;
