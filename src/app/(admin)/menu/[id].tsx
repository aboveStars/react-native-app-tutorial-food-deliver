import { useProduct } from "@/src/api/products";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import Colors from "@/src/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

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

  if (isLoading) return <ActivityIndicator />;

  if (error) return <Text>Error on getting product details.</Text>;

  if (!product) {
    return <Text>Product not found.</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      <Stack.Screen options={{ title: "Details: " + product.name }} />

      <Image
        source={{
          uri: product.image || defaultPizzaImage,
        }}
        style={styles.image}
      />

      <Text style={styles.price}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
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
    textAlign: "center",
  },
});

export default ProductDetailScreen;
