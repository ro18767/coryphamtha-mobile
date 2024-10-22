import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import IconButton from "@/components/buttons/IconButton";
import TextButton from "@/components/buttons/TextButton";
import { useEffect, useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import ViewButton from "../buttons/ViewButton";

export default function HomeDescription() {
  const backgroundColor = useThemeColor(
    {
      light: "#000000",
      dark: "#000000",
    },
    "none"
  );
  return (
    <View
      style={[
        styles.conteiner,
        {
          backgroundColor,
        },
      ]}
    >
      <View style={[styles.bg_wrap]}>
        <Image
          style={[styles.bg_image]}
          source={require("@/assets/images/backgrounds/brand-image.png")}
          blurRadius={6}
        />
      </View>
      <View style={[styles.image_text_wrap]}>
        <View style={styles.one_line}>
          <ThemedText colorName="secondary_text" style={[styles.image_text]}>
            Новий рік з
          </ThemedText>
          <ThemedText
            colorName="secondary_text"
            style={[styles.image_text, styles.image_logo_text]}
          >
            « BOTANICA »
          </ThemedText>
        </View>
        <ThemedText
          colorName="secondary_text"
          style={[styles.image_text, styles.image_small_text]}
        >
          Дуууже привабливі знижки
        </ThemedText>
      </View>

      <TextButton
        pressableProps={{
          onPress: () => {
            console.log("test");
          },
        }}
        conteinerProps={{
          colorName: "primary_background",
          style: [styles.button],
        }}
        textProps={{
          colorName: "primary_text",
          style: [styles.button__text],
        }}
      >
        Перейти до товару
      </TextButton>
    </View>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    width: "100%",
    minHeight: 300,
    paddingTop: 30,
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
    position: "relative",
  },
  bg_wrap: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  bg_image: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
  image_text_wrap: {},
  image_text: {
    fontSize: 32,
    lineHeight: 40,
    textAlign: "center",
  },
  image_small_text: {
    fontSize: 24,
    lineHeight: 28,
  },
  image_logo_text: {
    fontFamily: "IrishGrover",
  },
  one_line: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 8,
  },
  button: {
    paddingHorizontal: 12,
    height: 40,
    justifyContent: "center",
  },
  button__text: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 20,
  },
});
