import Button from "@/src/components/Button";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import Colors from "@/src/constants/Colors";
import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";

import {
  useDeleteProduct,
  useInsertProduct,
  useProduct,
  useUpdateProduct,
} from "@/src/api/products";
import * as ImagePicker from "expo-image-picker";
import { Stack, router, useLocalSearchParams } from "expo-router";

import * as FileSystem from "expo-file-system";
import { supabase } from "@/src/lib/supabase";

import { decode } from "base64-arraybuffer";

type Props = {};

const create = (props: Props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState("");

  const [image, setImage] = useState("");

  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(
    idString === undefined
      ? ""
      : typeof idString === "string"
      ? idString
      : idString[0]
  );

  const isUpdating = !!id;

  const { mutate: insertProduct } = useInsertProduct();

  const { mutate: updateProduct } = useUpdateProduct();

  const { data: updatingProduct } = useProduct(id);

  const { mutate: deleteProduct } = useDeleteProduct();

  useEffect(() => {
    if (updatingProduct) {
      setName(updatingProduct.name as string);
      setPrice(updatingProduct.price?.toString() as string);
      setImage(updatingProduct.image as string);
    }
  }, [updatingProduct]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onCreate = async () => {
    if (!validateInput()) return;

    const imagePath = await uploadImage();
    if (!imagePath) return;

    console.warn("Adding item to database...");
    insertProduct(
      { name, price: parseFloat(price), image: imagePath },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
  };

  const onUpdate = async () => {
    if (!validateInput()) return;

    console.warn("Updating item...");

    const imagePath = await uploadImage();
    if (!imagePath) return;

    updateProduct(
      { id, name, price: parseFloat(price), image: imagePath },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );

    resetFields();
  };

  const onSubmit = () => {
    if (isUpdating) {
      return onUpdate();
    }

    onCreate();
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

  const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure to delete this product?", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDelete,
      },
    ]);
  };

  const onDelete = () => {
    console.warn("Deleting...");

    deleteProduct(id, {
      onSuccess() {
        router.replace("/(admin)");
      },
    });
  };

  const uploadImage = async () => {
    if (!image) {
      return console.error("No image in state.");
    }

    if (!image.startsWith("file://")) {
      console.error("Image is already with a link.");
      return image;
    }

    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: "base64",
    });

    const filePath = Date.now().toString() + ".png";
    const contentType = "image/png";

    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(filePath, decode(base64), { contentType: contentType });

    if (error) {
      console.error("Error on uploading image...: ", error.message);
      return;
    }

    if (data) {
      console.log(data);
      return supabase.storage.from("product-images").getPublicUrl(data.path)
        .data.publicUrl;
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: isUpdating ? "Update" : "Create",
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
      <Button text={isUpdating ? "Update" : "Create"} onPress={onSubmit} />
      {isUpdating && (
        <Text onPress={confirmDelete} style={styles.deleteText}>
          Delete
        </Text>
      )}
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
  deleteText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});

export default create;
