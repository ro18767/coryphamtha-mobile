import { StyleSheet, Text, TextInput, View } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import IconButton from "@/components/buttons/IconButton";
import TextButton from "@/components/buttons/TextButton";
import { useEffect, useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import ViewButton from "../buttons/ViewButton";

const data = {
  category: {
    title: "Бантики",
  },
};

export default function PageTitle() {
  const { showFilter: showFilterParam } = useLocalSearchParams<{
    showFilter: string;
  }>();
  const showFilter = Number.parseInt(showFilterParam ?? "") || 0;

  return (
    <ThemedView style={styles.filter} colorName="surface_background">
      <ThemedText colorName="primary_outline_text" style={styles.filter__title}>
        Вибрані товари
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  filter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 24,
    zIndex: 1,
  },
  filter__title: {
    lineHeight: 36,
    fontSize: 28,
    fontWeight: 700,
  },
  filter__button: {
    height: 40,
  },
  filter__button_icon: {
    width: 40,
  },
  filter__button__container: {
    height: "100%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  filter__button_icon__image: {
    height: 24,
    objectFit: "contain",
  },
  filter__popup_wrap: {
    position: "absolute",
    top: "100%",
    left: 20,
    right: 20,
  },
  filter__popup: {
    paddingHorizontal: 32,
    paddingVertical: 40,
    borderRadius: 8,
    shadowOffset: { width: -8, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 28,
    rowGap: 24,
  },
  filter__price_wrap: {
    rowGap: 16,
    alignItems: "center",
  },
  filter__price_label: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: 600,
  },
  filter__price_filter_wrap: {
    flexDirection: "row",
    columnGap: 16,
  },
  filter__price_wrap__input: {
    width: 105,
    borderWidth: 1,
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 2,
  },
  filter__tag_list_wrap: {
    rowGap: 32,
    columnGap: 32,
    flexWrap: "wrap",
    maxHeight: 600,
  },
  filter__tag_mini_list_wrap: {
    rowGap: 12,
  },
  filter__tag_wrap: {
    rowGap: 16,
  },
  filter__tag_label: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: 600,
  },
  filter__tag_filter_wrap: {
    flexDirection: "row",
    columnGap: 12,
  },
  filter__tag_option: {
    alignItems: "center",
  },
  filter__tag_option_label: {
    fontSize: 14,
    lineHeight: 20,
  },
  filter__tag_option_input: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 4,
  },
  filter__tag_option_input_check: {
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
  filter__popup_close_button_icon: {
    width: 24,
    height: 24,
    position: "absolute",
    top: 8,
    right: 8,
  },
  filter__popup_close_button__container: {
    height: "100%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  filter__popup_close_button__image: {
    height: 24,
    objectFit: "contain",
  },
});
