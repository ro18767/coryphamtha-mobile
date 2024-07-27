import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StatusBar } from "expo-status-bar";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, errorFontsLoad] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (errorFontsLoad) {
      throw errorFontsLoad;
    }
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, errorFontsLoad]);

  if (!fontsLoaded) {
    return null;
  }

  const backgroundColor = useThemeColor({}, "primary_background");

  return (
    <>
      <StatusBar style="light" backgroundColor={backgroundColor} />
      <SafeAreaView style={{ backgroundColor, height: "100%" }}>
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="+not-found" />
          </Stack>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
