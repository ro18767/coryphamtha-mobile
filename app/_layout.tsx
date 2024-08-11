import { ScrollView } from "react-native";
import React from "react";
import { Stack } from "expo-router";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarSetup from "@/components/texnical/StatusBarSetup";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, errorFontsLoad] = useFonts({
    IrishGrover: require("@/assets/fonts/IrishGrover/IrishGrover-Regular.ttf"),
    Inter: require("@/assets/fonts/Inter/Inter-VariableFont_opsz,wght.ttf"),
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
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
  return (
    <>
      <StatusBarSetup />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(home)/index" />
          <Stack.Screen name="+not-found" />
          </Stack>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
