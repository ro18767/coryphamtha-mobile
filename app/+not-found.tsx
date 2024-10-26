import { ThemedText } from "@/components/ThemedText";
import { Link, Stack } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        <Stack.Screen options={{ headerShown: true, title: "Oops!" }} />
        <View style={styles.page_wrap}>
          <View>
            <ThemedText style={styles.title} colorName="secondary_outline_text">
              404
            </ThemedText>

            <ThemedText style={styles.title} colorName="secondary_outline_text">
              Здається, що щось пішло не так..
            </ThemedText>
          </View>

          <View style={[styles.bg_wrap]}>
            <Image
              style={[styles.bg_image]}
              source={require("@/assets/images/backgrounds/not-found-image.png")}
            />
          </View>
          <Link href="/">
            <Text>Go to home screen!</Text>
          </Link>
        </View>
      </ScrollView>
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
    padding: 16
  },
  bg_image: {
    objectFit: "contain",
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
