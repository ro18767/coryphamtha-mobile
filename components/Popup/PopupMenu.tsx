import { usePopupContext } from "@/context/PopupContext";
import { ThemedView } from "@/components/ThemedView";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { ThemedText } from "../ThemedText";
import { useState } from "react";
import IconButton from "../buttons/IconButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import TextButton from "../buttons/TextButton";
import ViewButton from "../buttons/ViewButton";
import { Sizes } from "@/constants/Sizes";
import PopupSignIn from "./PopupSignIn";
import React from "react";
import { usePopoverContext } from "@/context/PopoverContext";
import { Link } from "expo-router";
type PopularProduct = {
  title: string;
  link: string;
  source: ImageSourcePropType;
};

const item_list_data: PopularProduct[] = [
  {
    title: "Вибрані товари",
    link: "/wishlist",
    source: require("@/assets/images/icons/like-icon-yellow.png"),
  },
  {
    title: "Кошик",
    link: "/cart",
    source: require("@/assets/images/icons/basket-icon-yellow.png"),
  },
  {
    title: "Кабінет",
    link: "/cabinet",
    source: require("@/assets/images/icons/cabinet-icon-yellow.png"),
  },
];

export default function PopupMenu() {
  const popoverContext = usePopoverContext();
  if (!popoverContext) return;

  const { popoverComponentRef, setPopoverData, setPopoverVisible } =
    popoverContext;
  const borderColor = useThemeColor(
    {
      light: "#898989",
      dark: "#898989",
    },
    "surface_outline_background"
  );
  const color = useThemeColor({}, "surface_text");
  const color2 = useThemeColor({}, "secondary_outline_background");

  return (
    <>
      <Pressable
        style={styles.backdrop}
        onPress={() => {
          setPopoverVisible(false);
        }}
      />

      <ThemedView
        style={styles.container}
        colorName="secondary_outline_background"
      >
        <ThemedView
          style={[styles.arrow, { borderBottomColor: color2 }]}
          colorName="none"
        ></ThemedView>
        {item_list_data.map((v, i) => {
          const { link, source, title } = v;
          return (
            <Link href={link} style={styles.link_row_wrap}>
              <View key={i} style={[styles.link_row, { borderColor }]}>
                <View style={[styles.icon_wrap]}>
                  <Image source={source} style={[styles.icon]} />
                </View>
                <ThemedText
                  style={styles.link_text}
                  colorName="secondary_outline_text"
                >
                  {title}
                </ThemedText>
              </View>
            </Link>
          );
        })}
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  arrow: {
    height: 24,
    position: "absolute",
    right: 16,
    bottom: "100%",
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 12,
    borderColor: "#00000000",
  },
  container: {
    position: "absolute",
    top: Sizes.HEADER_HEIGHT - 2,
    right: 24,

    borderRadius: 4,
    shadowOffset: { width: -8, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 28,
    rowGap: 8,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  link_row_wrap: {
    display: "flex",
    flexDirection: "column",
  },
  link_row: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 8,
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  link_text: {
    fontSize: 16,
    lineHeight: 24,
  },
  icon_wrap: {},
  icon: {},
});
