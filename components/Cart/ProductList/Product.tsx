import { ThemedText } from "@/components/ThemedText";
import IconButton from "@/components/buttons/IconButton";
import ViewButton from "@/components/buttons/ViewButton";
import { URL_BASE } from "@/constants/glabals";
import { updateCartItems, useAppContext } from "@/context/AppProvider";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";

export default function Product({
  item_id,
  title,
  price,
  vendor_code,
  imageUrl,
}: {
  item_id: number;
  title: string;
  price: number;
  vendor_code: number | string;
  imageUrl?: string | URL | null;
}) {
  const { setCartItems } = useAppContext();
  const borderColor = useThemeColor({}, "secondary_outline_text");

  function deleteCartItem(cart_item_id: number) {
    fetch(`${URL_BASE}/api/cartItems/delete/${cart_item_id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        updateCartItems(setCartItems);
      });
  }

  return (
    <View style={styles.product_wrap_space}>
      <ViewButton
        pressableProps={{
          style: [styles.product_wrap, styles.product_border_radius],
        }}
        conteinerProps={{
          style: [styles.product, styles.product_border_radius],
          colorName: "surface_background",
        }}
      >
        <View style={styles.product__details2}>
          <View style={styles.product__preview}>
            <View
              style={[
                styles.product__preview__img_wrap,
                styles.product_border_radius,
                { borderColor },
              ]}
            >
              {imageUrl ? (
                <Image
                  style={styles.product__preview__img}
                  source={{
                    uri: imageUrl.toString(),
                  }}
                />
              ) : null}
            </View>
          </View>
          <View style={styles.product__details1}>
            <ThemedText
              style={styles.product__title}
              colorName="primary_outline_text"
            >
              {title}
            </ThemedText>
            <ThemedText
              style={styles.product__vendor_code}
              colorName="surface_text"
            >
              Артикул: {vendor_code}
            </ThemedText>
          </View>
        </View>
        <View style={styles.product__bottom_wrap}>
          <ThemedText
            style={styles.product__price}
            colorName="primary_outline_text"
          >
            Сума: {price}₴
          </ThemedText>
          <IconButton
            pressableProps={{
              style: [
                styles.product__button,
                styles.product__button_icon,
                styles.product__wishlist_add,
              ],
              onPress: () => {
                deleteCartItem(item_id);
              },
            }}
            underlayProps={{
              style: {
                opacity: 0.15,
              },
            }}
            conteinerProps={{
              style: styles.product__button__container,
            }}
            imageProps={{
              style: styles.product__button_icon__image,
              source: require("@/assets/images/icons/delete-icon-red.png"),
            }}
          />
        </View>
      </ViewButton>
    </View>
  );
}

const styles = StyleSheet.create({
  product_wrap_space: {
    paddingHorizontal: 8,
    height: "auto",
    overflow: "hidden",
    gap: 8,
  },
  product_wrap: {
    flexGrow: 1,
    height: "auto",
    overflow: "hidden",
  },
  product_border_radius: {
    borderRadius: 4,
  },
  product: {
    width: "100%",
    paddingTop: 4,
    paddingLeft: 4,
    paddingRight: 4,
    paddingBottom: 8,
    borderColor: "#00000000",
    gap: 8,
  },
  product__preview: {
    width: 76,
    aspectRatio: 1 / 1,
  },
  product__preview__img_wrap: {
    width: "100%",
    height: "100%",
    borderWidth: 1,
  },
  product__preview__img: {
    width: "100%",
    height: "100%",
  },
  product__details2: {
    flexDirection: "row",
    gap: 8,
  },
  product__details1: {},
  product__vendor_code: {
    lineHeight: 20,
    fontSize: 16,
    fontWeight: 400,
  },
  product__title: {
    lineHeight: 20,
    fontSize: 16,
    fontWeight: 500,
  },
  product__tag: {
    lineHeight: 24,
    fontSize: 20,
    fontWeight: 500,
  },
  product__bottom_wrap: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  product__price: {
    lineHeight: 24,
    fontSize: 20,
    fontWeight: 600,
  },
  product__button: {
    height: 24,
  },
  product__button_icon: {
    width: 24,
  },
  product__button__container: {
    height: "100%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  product__button_icon__image: {
    height: 24,
    objectFit: "contain",
  },
  product__wishlist_add: {},
});
