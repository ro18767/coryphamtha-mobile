import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, View } from "react-native";
import Product from "./Product";
import { useEffect, useState } from "react";
import { URL_BASE } from "@/constants/glabals";
import { useAppContext } from "@/context/AppProvider";
import { usePopupContext } from "@/context/PopupContext";
import { router } from "expo-router";
import { mainScrollViewRef } from "@/hooks/mainScrollViewRef";

export default function ProductList() {
  const { loading, user, wishlistItems, products } = useAppContext();

  const popupContext = usePopupContext();
  useEffect(() => {
    if (loading) return;
    if (!popupContext) return;

    const { popupComponentName, setPopupData, setPopupVisible } = popupContext;
    console.log('====================================');
    console.log('navigate');
    console.log('====================================');
    if (user == null) {
      setPopupVisible(false);
      popupComponentName.current = "PopupSignIn";
      setPopupData({});
      setPopupVisible(true);
      setTimeout(() => {
        router.navigate("/(home)");
        mainScrollViewRef.current?.scrollTo({
          y: 0,
          animated: false,
        });
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
        mainScrollViewRef.current?.scrollTo({
          y: 0,
          animated: false,
        });
      }, 0);
      return;
    }
  }, [loading]);
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
