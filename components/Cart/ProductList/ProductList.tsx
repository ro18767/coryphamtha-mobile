import { ThemedView } from "@/components/ThemedView";
import { URL_BASE } from "@/constants/glabals";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Product from "./Product";
import { useAppContext } from "@/context/AppProvider";
import { usePopupContext } from "@/context/PopupContext";
import { router } from "expo-router";

export default function ProductList() {
  const { loading, user, cartItems, products } = useAppContext();

  const popupContext = usePopupContext();
  if (!popupContext) return;

  const { popupComponentName, setPopupData, setPopupVisible } = popupContext;
  useEffect(() => {
    if (loading) return;
    if (user == null) {
      setPopupVisible(false);
      popupComponentName.current = "PopupSignIn";
      setPopupData({});
      setPopupVisible(true);
      setTimeout(() => {
        router.navigate("/(home)");
      }, 0);
      return;
    }

    if (!("id" in user)) {
      setPopupVisible(false);
      popupComponentName.current = "PopupSignIn";
      setPopupData({});
      setPopupVisible(true);
      setTimeout(() => {
        router.navigate("/(home)");
      }, 0);
      return;
    }
  }, [loading]);

  if (user == null) return;

  return (
    <ThemedView style={styles.product_list} colorName="none">
      {cartItems
        .filter((cartItem) => cartItem.user_id === user.id)
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
