import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import TextButton from "@/components/buttons/TextButton";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import ProductList from "./ProductList";
import { router } from "expo-router";
import { usePopupContext } from "@/context/PopupContext";
import { useAppContext } from "@/context/AppProvider";

export default function CartBlock() {
  const popupContext = usePopupContext();
  const { loading, user, setUser } = useAppContext();

  if (!popupContext) return;

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
      }, 0);
      return;
    }
  }, [loading]);

  const { popupComponentName, setPopupData, setPopupVisible } = popupContext;
  return (
    <ThemedView style={styles.navigation} colorName="none">
      <ThemedText
        style={styles.container__header}
        colorName="primary_outline_text"
      >
        Кошик
      </ThemedText>
      <ProductList />
      <TextButton
        pressableProps={{
          onPress: () => {
            setPopupVisible(false);
            router.navigate("/create_order");
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
        Оформити замовлення
      </TextButton>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  navigation: {
    paddingVertical: 24,
    display: "flex",
    alignItems: "center",
    rowGap: 16,
  },
  container__header: {
    fontWeight: 600,
    fontSize: 20,
    lineHeight: 24,
    width: "100%",
    paddingHorizontal: 30,
  },
  navigation__more_button: {
    paddingHorizontal: 16,
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
