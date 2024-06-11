import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Button from "@/src/components/Button";
import { router } from "expo-router";
import { supabase } from "@/src/lib/supabase";

const signUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateAccountButton = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
      console.log(error);
    }

    setLoading(false);
  };

  const handleSignInButton = () => {
    router.replace("/(auth)/signIn");
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
            autoCapitalize="none"
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
            autoCapitalize="none"
          />
        </View>

        <Button
          text="Create Account"
          disabled={loading}
          onPress={handleCreateAccountButton}
        />

        <Text
          style={{
            textAlign: "center",
          }}
          onPress={handleSignInButton}
        >
          Sign In
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

export default signUp;
