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
import AppProvider, { useAppContext } from "@/context/AppProvider";
import { popupMap } from "@/context/popupMap";
import PopoverProvider, { usePopoverContext } from "@/context/PopoverContext";
import { popoverMap } from "@/context/popoverMap";

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
        <AppProvider>
          <View style={{ flex: 1 }}>
            <PopupProvider>
              <PopoverProvider>
                <Children />
              </PopoverProvider>
            </PopupProvider>
          </View>
        </AppProvider>
      </SafeAreaView>
    </>
  );
}

function Children({ children }: any) {
  const popupContext = usePopupContext();
  const popoverContext = usePopoverContext();
  if (!popupContext) return;
  if (!popoverContext) return;

  const { popupVisible, popupData, popupComponentName } = popupContext;

  const { popoverVisible, popoverData, popoverComponentName } = popoverContext;

  // useEffect(() => {
  //   console.log(popupVisible);
  //   console.log(popupData);
  //   console.log(popupComponentName);
  // }, [popupVisible, popupData, popupComponentName]);
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
      {popupVisible &&
      popupComponentName.current != null &&
      popupComponentName.current in popupMap &&
      popupData
        ? ((
            Component: React.FunctionComponent<{
              data: any;
            }>
          ) => <Component data={popupData} />)(
            popupMap[popupComponentName.current]
          )
        : null}
      {popoverVisible &&
      popoverComponentName.current != null &&
      popoverComponentName.current in popoverMap &&
      popoverData
        ? ((
            Component: React.FunctionComponent<{
              data: any;
            }>
          ) => <Component data={popoverData} />)(
            popoverMap[popoverComponentName.current]
          )
        : null}
    </>
  );
}
