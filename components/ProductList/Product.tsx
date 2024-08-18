import { ThemedText } from "@/components/ThemedText";
import IconButton from "@/components/buttons/IconButton";
import ViewButton from "@/components/buttons/ViewButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";

export default function Product() {
  const borderColor = useThemeColor({}, "secondary_outline_text");
  const [pressed, setPressed] = useState(false);

  return (
    <ViewButton
      pressableProps={{
        onPressOut: () => {
          setPressed(false);
        },
        onPressIn: () => {
          setPressed(true);
        },
        style: [styles.product_wrap, styles.product_border_radius],
      }}
      conteinerProps={{
        style: [
          styles.product,
          styles.product_border_radius,
          pressed ? { borderColor } : undefined,
        ],
        colorName: "surface_background",
      }}
    >
      <View style={styles.product__preview}>
        <View style={styles.product__preview__img_wrap}>
          <Image
            style={styles.product__preview__img}
            source={require("@/assets/images/example/image 74.png")}
          />
        </View>
        <IconButton
          pressableProps={{
            style: [
              styles.product__button,
              styles.product__button_icon,
              styles.product__wishlist_add,
            ],
            onPress: () => {},
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
            source: require("@/assets/images/icons/like-icon.png"),
          }}
        />
      </View>
      <ThemedText style={styles.product__title} colorName="surface_text">
        Бантик оксамитовий
      </ThemedText>

      <ThemedText style={styles.product__tag} colorName="primary_outline_text">
        сірий
      </ThemedText>
      <View style={styles.product__bottom_wrap}>
        <ThemedText
          style={styles.product__price}
          colorName="secondary_outline_text"
        >
          268₴
        </ThemedText>
        <IconButton
          pressableProps={{
            style: [styles.product__button, styles.product__button_icon],
            onPress: () => {},
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
            source: require("@/assets/images/icons/basket-icon.png"),
          }}
        />
      </View>
    </ViewButton>
  );
}

const styles = StyleSheet.create({
  product_wrap: {
    width: 180,
    height: "auto",
    overflow: "hidden",
    flexGrow: 1,
    flexShrink: 1,
  },
  product_border_radius: {
    borderRadius: 4,
  },
  product: {
    width: "100%",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 28,
    borderWidth: 1,
    borderColor: "#00000000",
  },
  product__preview: {
    width: "100%",
    aspectRatio: 1 / 1,
  },
  product__preview__img_wrap: {
    width: "100%",
    height: "100%",
  },
  product__preview__img: {
    width: "100%",
    height: "100%",
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
  product__bottom_wrap: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-end",
    justifyContent: "space-between",
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
    right: 0,
    top: 0,
  },
});