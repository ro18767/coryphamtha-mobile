import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import IconButton from "@/components/buttons/IconButton";
import TextButton from "@/components/buttons/TextButton";
import StatusBarSetup from "@/components/texnical/StatusBarSetup";

export default function Index() {
  const [count, setCount] = useState(0);
  const onPress = () => setCount(count + 1);

  return (
    <>
      <ThemedView style={styles.header} colorName="primary_background">
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
            style: [
              styles.header__button__image,
              styles.header__button_icon__image,
            ],
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
            style: [
              styles.header__button__image,
              styles.header__button_icon__image,
            ],
            source: require("@/assets/images/icons/search-icon.png"),
          }}
        />

        <TextButton
          pressableProps={{
            style: [styles.header__button, styles.header__button_logo],
            onPress: () => {},
          }}
          conteinerProps={{
            style: styles.header__button__container,
            colorName: "primary_background",
          }}
          textProps={{
            style: { fontFamily: "IrishGrover" },
            colorName: "primary_text",
          }}
        >
          BOTANICA
        </TextButton>

        <View
          style={[styles.header__button, styles.header__button_icon]}
        ></View>

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
            style: [
              styles.header__button__image,
              styles.header__button_icon__image,
            ],
            source: require("@/assets/images/icons/account-icon.png"),
          }}
        />
      </ThemedView>
      <View style={styles.conteiner}>
        <Text>HOME</Text>
        <Link href="/profile">PROFILE</Link>
      </View>
      <ThemedView style={styles.header} colorName="primary_background">
        <ThemedText colorName="primary_text">FOOTER</ThemedText>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    columnGap: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  header__button: {
    height: 40,
  },
  header__button_icon: {
    width: 40,
  },
  header__button_logo: {
    flexGrow: 1,
  },

  header__button__container: {
    height: "100%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  header__button__image: {},
  header__button_icon__image: {
    height: 24,
    objectFit: "contain",
  },
  conteiner: {
    display: "flex",
    flex: 1,
    alignItems: "center",
  },
});
