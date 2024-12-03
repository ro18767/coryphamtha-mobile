import { StyleSheet, TextInput, View, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import TextButton from "@/components/buttons/TextButton";
import { useEffect, useMemo, useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import ViewButton from "../buttons/ViewButton";
import { URL_BASE } from "@/constants/glabals";
import { updateAddresses, useAppContext } from "@/context/AppProvider";
import { usePopupContext } from "@/context/PopupContext";
import { router } from "expo-router";
import { mainScrollViewRef } from "@/hooks/mainScrollViewRef";
import { ThemedView } from "../ThemedView";
import { Sizes } from "@/constants/Sizes";

const button_list = [
  {
    title: "Персональні дані",
    link: "/account",
    source: require("@/assets/images/icons/account-gray.png"),
  },
  {
    title: "Мої замовлення",
    link: "/cart",
    source: require("@/assets/images/icons/cart-gray.png"),
  },
  {
    title: "Бонуси",
    link: "/favorite",
    source: require("@/assets/images/icons/bonus-gray.png"),
  },

  {
    title: "Вибрані товари",
    link: "/favorite",
    source: require("@/assets/images/icons/like-gray.png"),
  },
  {
    title: "Вийти",
    link: null,
    source: require("@/assets/images/icons/account-gray.png"),
  },
] as const;
export default function PageContent() {
  const { loading, user, setUser, addresses, setAddresses } = useAppContext();

  const popupContext = usePopupContext();

  useEffect(() => {
    if (loading) return;
    if (!popupContext) return;

    const { popupComponentName, setPopupData, setPopupVisible } = popupContext;
    if (user == null) {
      setPopupVisible(false);
      popupComponentName.current = "PopupSignIn";
      setPopupData({});
      setPopupVisible(true);
      setTimeout(() => {
        router.navigate("/(home)");
        mainScrollViewRef.current?.scrollTo({
          y: 0,
          animated: false,
        });
      }, 0);
      return;
    }
    if (!("id" in user)) {
      setPopupVisible(false);
      popupComponentName.current = "PopupSignIn";
      setPopupData({});
      setPopupVisible(true);
      setTimeout(() => {
        router.navigate("/(home)");
        mainScrollViewRef.current?.scrollTo({
          y: 0,
          animated: false,
        });
      }, 0);
      return;
    }
  }, [loading]);

  if (user == null) return;
  if (!("id" in user)) return;
  if (!("firstName" in user)) return;
  if (!("lastName" in user)) return;
  if (!("phone" in user)) return;
  if (!("email" in user)) return;

  if (!popupContext) return;

  const { popupComponentName, setPopupData, setPopupVisible } = popupContext;

  if (loading) return;
  return (
    <>
      <ThemedView style={styles.container} colorName="none">
        {button_list.map((v, i) => {
          const { link, source, title } = v;
          return (
            <ViewButton
              key={i}
              pressableProps={{
                onPress: () => {
                  if (link == null) {
                    setUser(null);
                    router.navigate("/(home)");
                    mainScrollViewRef.current?.scrollTo({
                      y: 0,
                      animated: false,
                    });
                    return;
                  }
                  router.navigate(link);
                  mainScrollViewRef.current?.scrollTo({
                    y: 0,
                    animated: false,
                  });
                },
              }}
              conteinerProps={{
                style: styles.link_row_wrap,
                colorName: "surface_background",
              }}
            >
              <View style={[styles.link_row]}>
                <View style={[styles.icon_wrap]}>
                  <Image source={source} style={[styles.icon]} />
                </View>
                <ThemedText style={styles.link_text} colorName="surface_text">
                  {title}
                </ThemedText>
              </View>
            </ViewButton>
          );
        })}
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 8,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  link_row_wrap: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  link_row: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 16,
    flexDirection: "row",
  },
  link_text: {
    fontSize: 24,
    lineHeight: 28,
  },
  icon_wrap: {
    width: 28,
    height: 28,
  },
  icon: {
    width: 28,
    height: 28,
  },
});
