import { useProduct } from "@/src/api/products";
import Button from "@/src/components/Button";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import { useCart } from "@/src/providers/CartProvider";
import { PizzaSize } from "@/src/types";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailScreen = () => {
  const { id: idString } = useLocalSearchParams();

  const id = parseFloat(
    idString === undefined
      ? ""
      : typeof idString === "string"
      ? idString
      : idString[0]
  );

  const { data: product, error, isLoading } = useProduct(id);

  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

  const { addItem } = useCart();

  const router = useRouter();

  const addToCart = () => {
    if (!product) return;

    addItem(
      {
        id: product.id,
        image: product.image,
        name: product.name!,
        price: product.price!,
      },
      selectedSize
    );
    router.push("/cart");
  };

  if (isLoading) return <ActivityIndicator />;

  if (error) return <Text>Error on getting product details.</Text>;

  if (!product) {
    return <Text>Product not found.</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Details: " + product.name }} />

      <Image
        source={{
          uri: product.image || defaultPizzaImage,
        }}
        style={styles.image}
      />

      <Text>Select Size</Text>

      <View style={styles.sizes}>
        {sizes.map((s) => (
          <Pressable
            onPress={() => {
              setSelectedSize(s);
            }}
            style={[
              styles.size,
              { backgroundColor: selectedSize === s ? "gainsboro" : "white" },
            ]}
            key={s}
          >
            <Text
              style={[
                styles.sizeText,
                { color: selectedSize === s ? "black" : "gray" },
              ]}
            >
              {s}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.price}>${product.price}</Text>

      <Button onPress={addToCart} text="Add To Cart" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: "auto",
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  size: {
    backgroundColor: "gainsboro",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: 500,
  },
});

export default ProductDetailScreen;
