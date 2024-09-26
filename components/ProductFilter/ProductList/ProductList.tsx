import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, View } from "react-native";
import Product from "./Product";

export default function ProductList({
  offset,
  limit,
  totalCount,
}: {
  offset: number;
  limit: number;
  totalCount: number;
}) {
  return (
    <ThemedView style={styles.product_list} colorName="surface_background">
      {Array.from({
        length: Math.min(totalCount - offset, limit),
      }).map((v, i) => {
        let title = "Бантик оксамитовий";
        let price = 268;
        return <Product key={i} title={title} price={price} />;
      })}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  product_list: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    rowGap: 24,
    marginHorizontal: -8,
    paddingHorizontal: 24,
  },
});
