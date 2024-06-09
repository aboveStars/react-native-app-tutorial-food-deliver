import Colors from "@/src/constants/Colors";
import products from "@/src/data/products";
import { StyleSheet, View, Text, Image } from "react-native";

const product = products[1];

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: product.image,
        }}
        style={styles.image}
      />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor : "white",
    padding : 10,
    borderRadius : 10
  },

  image: {
    width: "100%",
    aspectRatio: 1,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 10,
  },

  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
});
