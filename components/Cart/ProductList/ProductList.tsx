import { ThemedView } from "@/components/ThemedView";
import { URL_BASE } from "@/constants/glabals";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Product from "./Product";
import { useAppContext } from "@/context/AppProvider";

export default function ProductList() {
  const { cartItems, setCartItems, products } = useAppContext();
  return (
    <ThemedView style={styles.product_list} colorName="none">
      {cartItems
        .map((cartItem) => {
          return {
            cartItem,
            product: products.find(
              (p) => String(p.id) === String(cartItem.product_id)
            ),
          };
        })
        .map(({ cartItem, product }, i) => {
          if (!product) return;
          let title = product.title;
          let price = product.price;
          let image_link = product.iamge_link
            ? `${URL_BASE}${product.iamge_link}`
            : null;
          let vendor_code = product.vendor_code;
          let item_id = cartItem.id;
          return (
            <Product
              key={i}
              item_id={item_id}
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
