import { StyleSheet, Text, View } from "react-native";
import { Link, router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import IconButton from "@/components/buttons/IconButton";
import TextButton from "@/components/buttons/TextButton";
import { Sizes } from "@/constants/Sizes";
import PopupMenu from "../Popup/PopupMenu";
import PopupCategory from "../Popup/PopupCategory";
import { usePopoverContext } from "@/context/PopoverContext";
import { usePopupContext } from "@/context/PopupContext";

export default function Header() {
  const popoverContext = usePopoverContext();
  if (!popoverContext) return;
  const popupContext = usePopupContext();
  if (!popupContext) return;

  const { popoverComponentRef, setPopoverData, setPopoverVisible } =
    popoverContext;
  const { popupComponentRef, setPopupData, setPopupVisible } = popupContext;
  return (
    <ThemedView style={styles.header} colorName="primary_background">
      <IconButton
        pressableProps={{
          style: [styles.header__button, styles.header__button_icon],
          onPress: () => {
            popoverComponentRef.current = PopupCategory;
            setPopoverData({});
            setPopoverVisible(true);
          },
        }}
        conteinerProps={{
          style: styles.header__button__container,
          colorName: "primary_background",
        }}
        imageProps={{
          style: styles.header__button_icon__image,
          source: require("@/assets/images/icons/catalog-icon.png"),
        }}
      />
      <IconButton
        pressableProps={{
          style: [styles.header__button, styles.header__button_icon],
          onPress: () => {},
        }}
        conteinerProps={{
          style: styles.header__button__container,
          colorName: "primary_background",
        }}
        imageProps={{
          style: styles.header__button_icon__image,
          source: require("@/assets/images/icons/search-icon.png"),
        }}
      />

      <TextButton
        pressableProps={{
          style: [styles.header__button, styles.header__button_logo],
          onPress: () => {
            setPopoverVisible(false);
            setPopupVisible(false);
            router.navigate("/");
          },
        }}
        conteinerProps={{
          style: styles.header__button__container,
          colorName: "primary_background",
        }}
        textProps={{
          style: styles.header__button_logo__text,
          colorName: "primary_text",
        }}
      >
        BOTANICA
      </TextButton>

      <View
        style={[
          styles.header__button,
          styles.header__button_icon,
          styles.header__button_icon_empty,
        ]}
      ></View>

      <IconButton
        pressableProps={{
          style: [styles.header__button, styles.header__button_icon],
          onPress: () => {
            popoverComponentRef.current = PopupMenu;
            setPopoverData({});
            setPopoverVisible(true);
          },
        }}
        conteinerProps={{
          style: styles.header__button__container,
          colorName: "primary_background",
        }}
        imageProps={{
          style: styles.header__button_icon__image,
          source: require("@/assets/images/icons/account-icon.png"),
        }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    height: Sizes.HEADER_HEIGHT,
    alignItems: "center",
  },
  header__button: {
    height: 40,
  },
  header__button_icon: {
    width: 40,
  },
  header__button_icon_empty: {
    flexShrink: 1,
  },
  header__button_logo: {},
  header__button_logo__text: {
    fontFamily: "IrishGrover",
    fontSize: 32,
    fontWeight: 400,
    lineHeight: 40,
    overflow: "hidden",
  },
  header__button__container: {
    height: "100%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  header__button_icon__image: {
    height: 24,
    objectFit: "contain",
  },
});
