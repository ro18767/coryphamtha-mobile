import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function Footer() {
  return (
    <>
      <ThemedView style={styles.footer} colorName="primary_background">
        
        <ThemedText colorName="primary_text">FOOTER</ThemedText>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  footer: {
    display: "flex",
    flexDirection: "row",
    columnGap: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
});
