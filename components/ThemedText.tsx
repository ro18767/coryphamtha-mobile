import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  colorName?: Parameters<typeof useThemeColor>[1];
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  colorName,
  darkColor,
  lightColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorName ?? "surface_text"
  );

  return (
    <Text
      style={[
        { color },
        styles.font_default,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  font_default: {
    fontFamily: "Inter",
  },
});
