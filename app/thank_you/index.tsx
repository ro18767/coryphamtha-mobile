import { ThemedText } from "@/components/ThemedText";
import { Link, Stack } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function () {
  return (
    <>
      <View style={styles.page_wrap}>
        <View>
          <ThemedText style={styles.title} colorName="secondary_outline_text">
            Дякую, що обрали наш магазин!
          </ThemedText>
        </View>

        <View style={[styles.bg_wrap]}>
          <Image
            style={[styles.bg_image]}
            resizeMode="contain"
            source={require("@/assets/images/backgrounds/thank-you-image.png")}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    lineHeight: 44,
    fontWeight: 700,
  },
  bg_wrap: {
    width: "100%",
    aspectRatio: 1.5,
  },
  bg_image: {
    width: "100%",
    height: "100%",
  },
  page_wrap: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 76,
    gap: 40,
  },
});
