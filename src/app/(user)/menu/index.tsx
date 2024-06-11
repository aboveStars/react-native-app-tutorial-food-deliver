import { useProductList } from "@/src/api/products";
import ProductListItem from "@/src/components/ProductListItem";

import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function MenuScreen() {
  const { error, data: products, isLoading } = useProductList();

  if (isLoading) return <ActivityIndicator />;

  if (error) return <Text>Failed to get products.</Text>;

  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  );
}
