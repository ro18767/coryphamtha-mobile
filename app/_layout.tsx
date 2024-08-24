import { ScrollView, View } from "react-native";
import React from "react";
import { Slot } from "expo-router";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarSetup from "@/components/texnical/StatusBarSetup";
import Header from "@/components/template/Header";
import Footer from "@/components/template/Footer";
import { ThemedView } from "@/components/ThemedView";
import { mainScrollViewRef } from "@/hooks/mainScrollViewRef";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout({ children }: any) {
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
        <Header />
        <ThemedView colorName="surface_background" style={{ flex: 1 }}>
          <ScrollView ref={mainScrollViewRef} style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Slot />
            </View>
            <Footer />
          </ScrollView>
        </ThemedView>
      </SafeAreaView>
    </>
  );
}
