import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, View } from "react-native";
import Product from "./Product";
import { useEffect, useState } from "react";
import { URL_BASE } from "@/constants/glabals";
import { useAppContext } from "@/context/AppProvider";

export default function ProductList() {
  const { user, wishlistItems, products } = useAppContext();
  if (user == null) return;
  if (!("id" in user)) return;
  return (
    <ThemedView style={styles.product_list} colorName="surface_background">
      {wishlistItems
        .filter((wishlistItem) => wishlistItem.user_id === user.id)
        .map((wishlistItem) => {
          return {
            wishlistItem,
            product: products.find(
              (p) => String(p.id) === String(wishlistItem.product_id)
            ),
          };
        })
        .map(({ wishlistItem, product }, i) => {
          if (!product) return;
          let id = product.id;
          let title = product.title;
          let price = product.price;
          let image_link = product.iamge_link
            ? `${URL_BASE}${product.iamge_link}`
            : null;
          let item_id = wishlistItem.id;
          return (
            <Product
              key={i}
              item_id={item_id}
              id={id}
              title={title}
              price={price}
              imageUrl={image_link}
            />
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
    maxWidth: 1000,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
