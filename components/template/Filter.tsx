import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import IconButton from "@/components/buttons/IconButton";
import TextButton from "@/components/buttons/TextButton";

const data = {
  category: {
    title: "Бантики",
  },
};

export default function Filter() {
  return (
    <ThemedView style={styles.filter} colorName="surface_background">
      <ThemedText colorName="primary_outline_text" style={styles.filter__title}>
        {data.category.title}
      </ThemedText>
      <IconButton
        pressableProps={{
          style: [styles.filter__button, styles.filter__button_icon],
          onPress: () => {},
        }}
        conteinerProps={{
          style: styles.filter__button__container,
          colorName: "surface_background",
        }}
        imageProps={{
          style: styles.filter__button_icon__image,
          source: require("@/assets/images/icons/filter-options-icon.png"),
        }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  filter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  filter__title: {
    lineHeight: 36,
    fontSize: 28,
    fontWeight: 700,
  },
  filter__button: {
    height: 40,
  },
  filter__button_icon: {
    width: 40,
  },
  filter__button__container: {
    height: "100%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  filter__button_icon__image: {
    height: 24,
    objectFit: "contain",
  },
});
