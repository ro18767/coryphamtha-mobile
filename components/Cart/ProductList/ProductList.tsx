import { ThemedView } from "@/components/ThemedView";
import { URL_BASE } from "@/constants/glabals";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Product from "./Product";

export default function ProductList() {
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
    <ThemedView style={styles.product_list} colorName="none">
      {(data?.products ?? []).map((v, i) => {
        let title = v.title;
        let price = v.price;
        let image_link = v.iamge_link ? `${URL_BASE}${v.iamge_link}` : null;
        let vendor_code = v.vendor_code;
        return (
          <Product
            key={i}
            title={title}
            price={price}
            imageUrl={image_link}
            vendor_code={vendor_code}
          />
        );
      })}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  product_list: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    rowGap: 24,
    paddingHorizontal: 24,
  },
});
