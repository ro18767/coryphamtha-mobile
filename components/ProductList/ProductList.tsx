import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";
import Product from "./Product";

export default function ProductList() {
  return (
    <ThemedView style={styles.product_list} colorName="surface_background">
      {Array.from({ length: 6 }).map((v, i) => {
        return <Product key={i} />;
      })}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  product_list: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
});
