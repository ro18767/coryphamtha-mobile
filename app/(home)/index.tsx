import { Image, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import IconButton from "@/components/buttons/IconButton";
import TextButton from "@/components/buttons/TextButton";
import Header from "@/components/template/Header";
import Footer from "@/components/template/Footer";
import Filter from "@/components/template/Filter";
import ViewButton from "@/components/buttons/ViewButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";

export default function Index() {
  const borderColor = useThemeColor({}, "secondary_outline_text");
  const [pressed, setPressed] = useState(false);
  return (
    <>
      <Header />
      <Filter />
      <ThemedView style={styles.product_list} colorName="surface_background">
        <ViewButton
          pressableProps={{
            onPressOut: () => {
              setPressed(false);
            },
            onPressIn: () => {
              setPressed(true);
            },
            style: [styles.product_wrap],
          }}
          conteinerProps={{
            style: [styles.product, pressed ? { borderColor } : undefined],
            colorName: "surface_background",
          }}
        >
          <Image
            style={styles.product__preview}
            source={require("@/assets/images/example/image 74.png")}
          />
          <ThemedText style={styles.product__title} colorName="surface_text">
            Бантик оксамитовий
          </ThemedText>

          <ThemedText
            style={styles.product__tag}
            colorName="primary_outline_text"
          >
            сірий
          </ThemedText>
          <ThemedText
            style={styles.product__price}
            colorName="secondary_outline_text"
          >
            268₴
          </ThemedText>
          <IconButton
            pressableProps={{
              style: [
                styles.product__button,
                styles.product__button_icon,
                styles.product__cart_add,
              ],
              onPress: () => {},
            }}
            conteinerProps={{
              style: styles.product__button__container,
              colorName: "surface_background",
            }}
            imageProps={{
              style: styles.product__button_icon__image,
              source: require("@/assets/images/icons/basket-icon.png"),
            }}
          />
          <IconButton
            pressableProps={{
              style: [
                styles.product__button,
                styles.product__button_icon,
                styles.product__wishlist_add,
              ],
              onPress: () => {},
            }}
            conteinerProps={{
              style: styles.product__button__container,
              colorName: "surface_background",
            }}
            imageProps={{
              style: styles.product__button_icon__image,
              source: require("@/assets/images/icons/like-icon.png"),
            }}
          />
        </ViewButton>
  
      </ThemedView>

      <ThemedView style={styles.conteiner} colorName="surface_background">
        <Text>HOME</Text>
        <Link href="/profile">PROFILE</Link>
      </ThemedView>
      <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    display: "flex",
    flex: 1,
    alignItems: "center",
  },
  product_list: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  product_wrap: {
    flexBasis: 180,
    borderRadius: 5,
  },
  product: {
    width: "100%",
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#00000000",
  },
  product__preview: {
    width: "100%",
    aspectRatio: 1 / 1,
  },
  product__title: {
    lineHeight: 24,
    fontSize: 20,
    fontWeight: 500,
  },
  product__tag: {
    lineHeight: 24,
    fontSize: 20,
    fontWeight: 500,
  },
  product__price: {
    lineHeight: 44,
    fontSize: 36,
    fontWeight: 500,
  },
  product__button: {
    height: 40,
  },
  product__button_icon: {
    width: 40,
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
  product__wishlist_add: {
    position: "absolute",
    right: 20,
    top: 20,
  },
  product__cart_add: {
    position: "absolute",
    right: 20,
    bottom: 28,
  },
});
