import { ThemedView } from "@/components/ThemedView";
import TextButton from "@/components/buttons/TextButton";
import ViewButton from "@/components/buttons/ViewButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, View } from "react-native";

export default function ProductNavigation() {
  return (
    <ThemedView style={styles.navigation}>
      <TextButton
        conteinerProps={{
          colorName: "secondary_background",
          style: [styles.navigation__more_button],
        }}
        textProps={{
          colorName: "secondary_text",
          style: [styles.navigation__more_button__text],
        }}
      >
        Показати ще
      </TextButton>
      <View style={[styles.navigation__offset_button_list]}>
        {Array.from({ length: 8 }).map((v, i) => {
          const color = useThemeColor(
            {
              light: "#D9D9D9",
              dark: "#D9D9D9",
            },
            "surface_outline_background"
          );
          return (
            <ViewButton
              key={i}
              pressableProps={{
                style: [styles.navigation__offset_button_wrap],
              }}
              conteinerProps={{
                colorName: i === 0 ? "secondary_background" : "none",
                style: [
                  styles.navigation__offset_button,
                  i !== 0
                    ? {
                        backgroundColor: color,
                      }
                    : undefined,
                ],
              }}
            ></ViewButton>
          );
        })}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  navigation: {
    paddingVertical: 32,
    display: "flex",
    alignItems: "center",
    rowGap: 16,
  },
  navigation__more_button: {
    paddingHorizontal: 60,
    paddingVertical: 12,
  },
  navigation__more_button__text: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: 500,
  },
  navigation__offset_button_list: {
    flexDirection: "row",
    columnGap: 8,
  },
  navigation__offset_button_wrap: {
    borderRadius: 9999,
    overflow: "hidden",
  },
  navigation__offset_button: {
    width: 10,
    height: 10,
  },
});
