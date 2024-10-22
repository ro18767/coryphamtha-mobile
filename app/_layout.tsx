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
import PopupProvider, { usePopupContext } from "@/context/PopupContext";
import PopoverProvider, { usePopoverContext } from "@/context/PopoverContext";

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
        <PopupProvider>
          <PopoverProvider>
            <Children />
          </PopoverProvider>
        </PopupProvider>
      </SafeAreaView>
    </>
  );
}

function Children({ children }: any) {
  const popupContext = usePopupContext();
  if (!popupContext) return;
  const popoverContext = usePopoverContext();
  if (!popoverContext) return;

  const { popupVisible, popupData, popupComponentRef } = popupContext;

  const { popoverVisible, popoverData, popoverComponentRef } = popoverContext;

  useEffect(() => {
    console.log(popupVisible);
    console.log(popupData);
    console.log(popupComponentRef);
  }, [popupVisible, popupData, popupComponentRef]);
  return (
    <>
      <Header />
      <ThemedView colorName="surface_background" style={{ flex: 1 }}>
        <ScrollView
          ref={mainScrollViewRef}
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={{ flex: 1 }}>
            <Slot />
          </View>
          <Footer />
        </ScrollView>
      </ThemedView>
      {popupVisible && popupComponentRef.current && popupData ? (
        <popupComponentRef.current data={popupData} />
      ) : null}
      {popoverVisible && popoverComponentRef.current && popoverData ? (
        <popoverComponentRef.current data={popoverData} />
      ) : null}
    </>
  );
}
