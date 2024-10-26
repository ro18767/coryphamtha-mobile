import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, View } from "react-native";
import Product from "./Product";
import { useEffect, useState } from "react";
import { URL_BASE } from "@/constants/glabals";

export default function ProductList(){
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(`${URL_BASE}/api/products`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);
  return (
    <ThemedView style={styles.product_list} colorName="surface_background">
      {(data?.products ?? []).map((v, i) => {
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