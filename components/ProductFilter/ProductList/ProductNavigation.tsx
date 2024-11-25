import { ThemedView } from "@/components/ThemedView";
import TextButton from "@/components/buttons/TextButton";
import ViewButton from "@/components/buttons/ViewButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { DEFAULT_PRODUCT_FILTER_LIMIT } from "./constants";
import { router, useNavigation } from "expo-router";
import { mainScrollViewRef } from "@/hooks/mainScrollViewRef";

export default function ProductNavigation({
  offset,
  limit,
  totalCount,
}: {
  offset: number;
  limit: number;
  totalCount: number;
}) {
  const buttonCount = useMemo(() => {
    return Math.max(Math.ceil(totalCount / DEFAULT_PRODUCT_FILTER_LIMIT), 1);
  }, [totalCount]);

  const buttons = useMemo(() => {
    return Array.from({
      length: buttonCount,
    }).map((v, i) => (
      <ProductNavigationButton i={i} limit={limit} offset={offset} key={i} />
    ));
  }, [totalCount]);

  return (
    <ThemedView style={styles.navigation}>
      {offset + limit >= totalCount ? null : (
        <TextButton
          pressableProps={{
            onPress: () => {
              router.setParams({
                limit: (limit + DEFAULT_PRODUCT_FILTER_LIMIT).toString(),
              });
            },
          }}
          conteinerProps={{
            colorName: "secondary_background",
            style: [styles.navigation__more_button],
          }}
          textProps={{
            colorName: "secondary_text",
            style: [styles.navigation__more_button__text],
          }}
        >
          Показати ще
        </TextButton>
      )}
      <View style={[styles.navigation__offset_button_list]}>{buttons}</View>
    </ThemedView>
  );
}

function ProductNavigationButton({ offset, limit, i }) {
  const color1 = useThemeColor({}, "secondary_background");
  const color2 = useThemeColor(
    {
      light: "#D9D9D9",
      dark: "#D9D9D9",
    },
    "surface_outline_background"
  );
  const color =
    i >= Math.floor(offset / DEFAULT_PRODUCT_FILTER_LIMIT) &&
    i < Math.floor((offset + limit) / DEFAULT_PRODUCT_FILTER_LIMIT)
      ? color1
      : color2;
  // console.log(i * DEFAULT_PRODUCT_FILTER_LIMIT);

  return (
    <ViewButton
      key={i}
      pressableProps={{
        style: [styles.navigation__offset_button_wrap],
        onPress: () => {
          router.setParams({
            limit: DEFAULT_PRODUCT_FILTER_LIMIT.toString(),
            offset: (i * DEFAULT_PRODUCT_FILTER_LIMIT).toString(),
          });
          mainScrollViewRef.current?.scrollTo({
            y: 0,
            animated: true,
          });
        },
      }}
      underlayProps={{
        style: styles.navigation__offset_button_wrap_overlay,
      }}
      conteinerProps={{
        style: [
          styles.navigation__offset_button,
          {
            backgroundColor: color,
          },
        ],
      }}
    ></ViewButton>
  );
}
const styles = StyleSheet.create({
  navigation: {
    paddingVertical: 32,
    display: "flex",
    alignItems: "center",
    rowGap: 16,
  },
  navigation__more_button: {
    paddingHorizontal: 60,
    paddingVertical: 12,
  },
  navigation__more_button__text: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: 500,
  },
  navigation__offset_button_list: {
    flexDirection: "row",
  },
  navigation__offset_button_wrap: {
    padding: 4,
  },
  navigation__offset_button_wrap_overlay: {
    position: "absolute",
    top: 4,
    left: 4,
    right: 4,
    bottom: 4,
    borderRadius: 9999,
  },
  navigation__offset_button: {
    borderRadius: 9999,
    width: 10,
    height: 10,
  },
});
