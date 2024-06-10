import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import React, { useState } from "react";
import Button from "@/src/components/Button";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import Colors from "@/src/constants/Colors";

import * as ImagePicker from "expo-image-picker";
import { Stack } from "expo-router";

type Props = {};

const create = (props: Props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState("");

  const [image, setImage] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleCreateButton = () => {
    if (!validateInput()) return;

    console.warn("Adding item to database...");

    resetFields();
  };

  const resetFields = () => {
    setName("");
    setPrice("");
    setImage("");
  };

  const validateInput = () => {
    setErrors("");

    if (!name) {
      setErrors("Name is required");
      return false;
    }
    if (!price) {
      setErrors("Price is required");
      return false;
    }

    if (isNaN(parseFloat(price))) {
      setErrors("Price should be only number.");
      return false;
    }

    return true;
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Create",
        }}
      />

      <Image
        source={{
          uri: image || defaultPizzaImage,
        }}
        style={styles.image}
      />

      <Text onPress={pickImage} style={styles.textButton}>
        Select Image
      </Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        placeholder="$53.53"
        keyboardType="numeric"
        style={styles.input}
        value={price}
        onChangeText={setPrice}
      />
      <Text style={styles.errors}>{errors}</Text>
      <Button text="Create" onPress={handleCreateButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  image: {
    width: "50%",
    borderRadius: 50,
    aspectRatio: 1,
    alignSelf: "center",
  },
  textButton: {
    alignSelf: "center",
    color: Colors.light.tint,
    fontSize: 18,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  label: {
    color: "gray",
    fontSize: 16,
  },
  errors: {
    color: "red",
    fontSize: 16,
  },
});

export default create;
