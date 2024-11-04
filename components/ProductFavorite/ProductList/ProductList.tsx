import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, View } from "react-native";
import Product from "./Product";
import { useEffect, useState } from "react";
import { URL_BASE } from "@/constants/glabals";
import { useAppContext } from "@/context/AppProvider";

export default function ProductList() {
  const { products } = useAppContext();

  return (
    <ThemedView style={styles.product_list} colorName="surface_background">
      {products.map((v, i) => {
        let title = v.title;
        let price = v.price;
        let image_link = v.iamge_link ? `${URL_BASE}${v.iamge_link}` : null;
        return (
          <Product key={i} title={title} price={price} imageUrl={image_link} />
        );
      })}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  product_list: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    rowGap: 24,
    marginHorizontal: -8,
    paddingHorizontal: 24,
  },
});
