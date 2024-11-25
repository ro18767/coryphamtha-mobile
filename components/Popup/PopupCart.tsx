import { usePopupContext } from "@/context/PopupContext";
import { ThemedView } from "@/components/ThemedView";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { useEffect, useState } from "react";
import IconButton from "../buttons/IconButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import TextButton from "../buttons/TextButton";
import ViewButton from "../buttons/ViewButton";
import { Sizes } from "@/constants/Sizes";
import React from "react";
import CartBlock from "../Cart/ProductList/CartBlock";

export default function PopupCart({ data: { successCallback } = {} }: any) {
  const popupContext = usePopupContext();
  if (!popupContext) return;

  const { popupComponentName, setPopupData, setPopupVisible } = popupContext;
  const borderColor = useThemeColor(
    {
      light: "#D9D9D9",
      dark: "#D9D9D9",
    },
    "surface_outline_background"
  );
  return (
    <>
      <ViewButton
        pressableProps={{
          style: {
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            opacity: 0.2,
          },
          onPress: () => {
            setPopupVisible(false);
          },
        }}
      />
      <View style={styles.backdrop} />
      <ThemedView style={styles.container} colorName="surface_background">
        <ScrollView
          style={[{ flexShrink: 1 }]}
          contentContainerStyle={{ flexShrink: 1 }}
        >
          <CartBlock />
        </ScrollView>
        <IconButton
          pressableProps={{
            style: [styles.container__form__close_button_pressable],
            onPress: () => {
              setPopupVisible(false);
            },
          }}
          conteinerProps={{
            style: [styles.container__form__close_button],
            colorName: "surface_background",
          }}
          imageProps={{
            style: [styles.container__form__close_button_image],
            source: require("@/assets/images/icons/popup-close-icon.png"),
          }}
        />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: Sizes.HEADER_HEIGHT,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "#000000",
    opacity: 0.2,
    pointerEvents: "none",
  },
  container: {
    position: "absolute",
    top: Sizes.HEADER_HEIGHT + 16,
    right: 24,
    left: 24,
    maxHeight: "50%",
    borderRadius: 8,
    shadowOffset: { width: -8, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 28,
    rowGap: 16,
    overflow: "hidden",

    maxWidth: 500,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  container__header: {
    fontWeight: 500,
    fontSize: 24,
    lineHeight: 32,
  },
  container__input_label: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 20,
  },
  container__input: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 12 - 1, // minus borderWidth
    paddingVertical: 16 - 1, // minus borderWidth
    borderRadius: 4,
    borderWidth: 1,
  },
  container__form: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  container__form__submit_button_wrap: {
    borderRadius: 4,
  },
  container__form__submit_button: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 4,
  },
  container__form__submit_button_text: {
    textAlign: "center",
  },
  container__form__close_button_pressable: {
    position: "absolute",
    top: 12,
    right: 12,
    height: 24,
    width: 24,
  },
  container__form__close_button: {
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  container__form__close_button_image: {
    height: 24,
    objectFit: "contain",
  },
  container__form__checkbox_list_wrap: {
    flexDirection: "row",
    columnGap: 12,
  },
  container__form__checkbox_wrap: {
    flexDirection: "row",
    columnGap: 12,
  },
  filter__tag_option_checkbox_input_wrap: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 4,
  },
  container__form__checkbox_check: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: "auto",
    width: "50%",
    height: "50%",
    borderRadius: 9999,
  },
  container__form__checkbox_label: {
    fontSize: 14,
    lineHeight: 20,
  },
});
