import { StyleSheet, Text, View } from "react-native";
import { Link, router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import IconButton from "@/components/buttons/IconButton";
import TextButton from "@/components/buttons/TextButton";
import { Sizes } from "@/constants/Sizes";
import { usePopoverContext } from "@/context/PopoverContext";
import { usePopupContext } from "@/context/PopupContext";
import { mainScrollViewRef } from "@/hooks/mainScrollViewRef";
import { useAppContext } from "@/context/AppProvider";

export default function Header() {
  const { user, setUser } = useAppContext();
  const popoverContext = usePopoverContext();
  if (!popoverContext) return;
  const popupContext = usePopupContext();
  if (!popupContext) return;

  const { popoverComponentName, setPopoverData, setPopoverVisible } =
    popoverContext;
  const { popupComponentName, setPopupData, setPopupVisible } = popupContext;
  return (
    <ThemedView style={styles.header} colorName="primary_background">
      <IconButton
        pressableProps={{
          style: [styles.header__button, styles.header__button_icon],
          onPress: () => {
            popoverComponentName.current = "PopupCategory";
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
          onPress: () => {
            setPopoverVisible(false);
            setPopupVisible(false);
            router.navigate("/filter");
            mainScrollViewRef.current?.scrollTo({
              y: 0,
              animated: false,
            });
          },
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
            router.navigate("/(home)");
            mainScrollViewRef.current?.scrollTo({
              y: 0,
              animated: false,
            });
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
        CORY
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
            if (user) {
              popoverComponentName.current = "PopupMenu";
              setPopoverData({});
              setPopoverVisible(true);
              return;
            }
            popupComponentName.current = "PopupSignIn";
            setPopupData({});
            setPopupVisible(true);
          },
          onLongPress: () => {
            if (user) {
              router.navigate("/account");
              mainScrollViewRef.current?.scrollTo({
                y: 0,
                animated: false,
              });
              return;
            }
            popupComponentName.current = "PopupSignIn";
            setPopupData({});
            setPopupVisible(true);
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
